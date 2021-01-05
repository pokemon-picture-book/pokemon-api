const gameRegion: Readonly<{ [k: string]: string[] }> = {
    rgby: ['kanto'],
    gsc: ['johto'],
    rse: ['hoenn'],
    frlg: ['kanto'],
    dp: ['innoh'],
    pt: ['innoh'],
    hgss: ['johto'],
    bw: ['unova'],
    xy: ['kalos'],
    oras: ['hoenn'],
    sm: ['alola'],
    usum: ['alola'],
};

const regionGame: Readonly<{ [k: string]: string[] }> = {
    kanto: ['rgby', 'frlg'],
    johto: ['gsc', 'hgss'],
    hoenn: ['rse', 'oras'],
    innoh: ['dp', 'pt'],
    unova: ['bw'],
    kalos: ['xy'],
    alola: ['sm', 'usum'],
};

export const getDefaultSet = (
    game: string = '',
    regions: string[] = []
): { game: string; regions: string[] } => {
    if (game && !regions.length) {
        const regionInGames = gameRegion[game] || [''];
        return { game, regions: regionInGames };
    }

    if (!game && regions.length) {
        const regionKey = Object.keys(regionGame)
            .filter((key) => regions.includes(key))
            .pop();
        const firstGame = regionKey ? regionGame[regionKey].shift() : '';

        return { game: firstGame || '', regions };
    }

    if (!(game || regions.length)) {
        return { game: 'rgby', regions: ['kanto'] };
    }

    return { game, regions };
};

export default {};
