import GameVersionGroupEntity from '@/01-enterprise/entity/GameVersionGroup.entity';
import RegionEntity from '@/01-enterprise/entity/Region.entity';

export const getDefaultSet = (
    param: {
        game: string;
        regions: string[];
    },
    allParam: {
        allGames: GameVersionGroupEntity[];
        allRegions: RegionEntity[];
    }
): { game: string; regions: string[] } => {
    const { game, regions } = param;
    const { allGames, allRegions } = allParam;

    if (!(allGames.length && allRegions.length)) {
        return {
            game: '',
            regions: [],
        };
    }

    // どちらも存在しない場合、全てのゲームの０番地から値を取得する
    if (!(game || regions.length)) {
        const { alias, gameVersionGroupRegions } = [...allGames].shift()!;
        const { region: firstRegion } = [...gameVersionGroupRegions].shift()!;
        return {
            game: alias,
            regions: [firstRegion.name],
        };
    }

    // ゲームが存在し、地域が存在しない場合
    if (game && !regions.length) {
        const matchGame = allGames.find((allGame) => allGame.alias === game);
        // 引数のゲームが全てのゲーム情報に含まれていない場合、全てのゲームの０番地から値を取得する
        if (!matchGame) {
            const { alias, gameVersionGroupRegions } = [...allGames].shift()!;
            const { region: firstRegion } = [
                ...gameVersionGroupRegions,
            ].shift()!;
            return {
                game: alias,
                regions: [firstRegion.name],
            };
        }

        const { alias, gameVersionGroupRegions } = matchGame;
        const { region: lastRegion } = [...gameVersionGroupRegions].pop()!;
        return {
            game: alias,
            regions: [lastRegion.name],
        };
    }

    // 地域が存在し、ゲームが存在しない場合
    if (!game && regions.length) {
        const matchRegions = allRegions.filter((allRegion) =>
            regions.includes(allRegion.name)
        );
        // 引数の地域が全ての地域情報に含まれていない場合、全ての地域の０番地から値を取得する
        if (!matchRegions || (matchRegions && !matchRegions.length)) {
            const { name, gameVersionGroupRegions } = [...allRegions].shift()!;
            const { gameVersionGroup: firstGameVersionGroup } = [
                ...gameVersionGroupRegions,
            ].shift()!;
            return {
                game: firstGameVersionGroup.alias,
                regions: [name],
            };
        }

        const lastRegion = [...matchRegions].pop()!;
        const { gameVersionGroup: firstGameVersionGroup } = [
            ...lastRegion.gameVersionGroupRegions,
        ].shift()!;
        return {
            game: firstGameVersionGroup.alias,
            regions: matchRegions.map((matchRegion) => matchRegion.name),
        };
    }

    const matchGame = allGames.find((allGame) => allGame.alias === game);
    // ゲーム・地域が存在する場合で、全てのゲーム情報に含まれていない場合
    if (!matchGame) {
        const matchRegions = allRegions.filter((allRegion) =>
            regions.includes(allRegion.name)
        );
        // 地域情報にも含まれていない場合、全てのゲームの０番地から値を取得する
        if (!matchRegions || (matchRegions && !matchRegions.length)) {
            const { alias, gameVersionGroupRegions } = [...allGames].shift()!;
            const { region: firstRegion } = [
                ...gameVersionGroupRegions,
            ].shift()!;
            return {
                game: alias,
                regions: [firstRegion.name],
            };
        }

        // 地域情報には含まれていた場合はその地域情報から値を取得する
        const firstMatchRegion = [...matchRegions].shift()!;
        const { gameVersionGroup: firstGameVersionGroup } = [
            ...firstMatchRegion.gameVersionGroupRegions,
        ].shift()!;
        return {
            game: firstGameVersionGroup.alias,
            regions: matchRegions.map((matchRegion) => matchRegion.name),
        };
    }
    const matchRegions = allRegions.filter((allRegion) =>
        regions.includes(allRegion.name)
    );
    // 全てのゲーム情報には含まれており、全ての地域情報には含まれていない場合、全てのゲームの０番地から値を取得する
    if (!matchRegions || (matchRegions && !matchRegions.length)) {
        const { alias, gameVersionGroupRegions } = matchGame;
        const { region: firstRegion } = [...gameVersionGroupRegions].shift()!;
        return {
            game: alias,
            regions: [firstRegion.name],
        };
    }

    return {
        game: matchGame.alias,
        regions: matchRegions.map((matchRegion) => matchRegion.name),
    };
};

export default {};
