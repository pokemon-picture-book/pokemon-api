import PokemonEntity from '@/01-enterprise/entity/Pokemon.entity';
import TypeEntity from '@/01-enterprise/entity/Type.entity';
import TypeNameEntity from '@/01-enterprise/entity/TypeName.entity';
import IPokemonRepository from '@/02-application/repository/IPokemon.repository';
import { injectable } from 'inversify';
import { SelectQueryBuilder } from 'typeorm';

@injectable()
export default class PokemonRepository implements IPokemonRepository {
    private commonFindAllQueryBuilder(whereParam: {
        languageId: number;
        gameVersionGroupId: number;
        regionIds: number[];
        isPokemonMainImage: boolean;
    }): SelectQueryBuilder<PokemonEntity> {
        return PokemonEntity.createQueryBuilder('pokemon')
            .innerJoin(
                'pokemon.region',
                'region',
                'region.id IN (:regionIds)',
                { regionIds: whereParam.regionIds }
            )
            .innerJoinAndSelect(
                'pokemon.pokemonGameImages',
                'pokemonGameImage',
                'pokemonGameImage.game_version_group_id = :gameVersionGroupId AND pokemonGameImage.is_main = :isPokemonMainImage',
                {
                    gameVersionGroupId: whereParam.gameVersionGroupId,
                    isPokemonMainImage: whereParam.isPokemonMainImage,
                }
            )
            .innerJoinAndSelect(
                'pokemon.pokemonNames',
                'pokemonName',
                'pokemonName.language_id = :languageId',
                { languageId: whereParam.languageId }
            )
            .innerJoinAndSelect('pokemon.pokemonTypes', 'pokemonType')
            .innerJoinAndMapOne(
                'pokemonType.type',
                TypeEntity,
                'type',
                'pokemonType.type_id = type.id'
            )
            .innerJoinAndMapMany(
                'type.typeNames',
                TypeNameEntity,
                'typeName',
                'type.id = typeName.type_id AND typeName.language_id = :languageId',
                { languageId: whereParam.languageId }
            );
    }

    public findAll(
        whereParam: {
            languageId: number;
            gameVersionGroupId: number;
            regionIds: number[];
            isPokemonMainImage: boolean;
        },
        pageParam: { offset?: number; limit?: number }
    ): Promise<PokemonEntity[]> {
        return this.commonFindAllQueryBuilder(whereParam)
            .take(pageParam.limit)
            .skip(pageParam.offset)
            .orderBy({
                'pokemon.id': 'ASC',
            })
            .getMany();
    }

    public findAllCount(whereParam: {
        languageId: number;
        gameVersionGroupId: number;
        regionIds: number[];
        isPokemonMainImage: boolean;
    }): Promise<number> {
        return this.commonFindAllQueryBuilder(whereParam).getCount();
    }
}
