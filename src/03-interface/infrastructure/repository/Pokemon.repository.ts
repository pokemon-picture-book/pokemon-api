import EvolutionEntity from '@/01-enterprise/entity/Evolution.entity';
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

    public findSimpleAll(whereParam: {
        languageId: number;
    }): Promise<PokemonEntity[]> {
        return PokemonEntity.createQueryBuilder('pokemon')
            .innerJoinAndSelect(
                'pokemon.pokemonNames',
                'pokemonName',
                'pokemonName.language_id = :languageId',
                { languageId: whereParam.languageId }
            )
            .getMany();
    }

    public findById(
        whereParam: {
            id: number;
            languageId: number;
            gameVersionGroupId: number;
        },
        isEvolution: boolean
    ): Promise<PokemonEntity | undefined> {
        const builder = PokemonEntity.createQueryBuilder('pokemon')
            .where('pokemon.id = :id', { id: whereParam.id })
            // flavor text entries
            .innerJoinAndSelect(
                'pokemon.flavorTextEntries',
                'flavorTextEntry',
                'flavorTextEntry.language_id = :languageId',
                {
                    languageId: whereParam.languageId,
                }
            )
            // generas
            .innerJoinAndSelect(
                'pokemon.generas',
                'genera',
                'genera.language_id = :languageId',
                {
                    languageId: whereParam.languageId,
                }
            )
            // pokemon footmark images (存在しないポケモンもいるため外部結合とする)
            .leftJoinAndSelect(
                'pokemon.pokemonFootmarkImages',
                'pokemonFootmarkImage'
            )
            // pokemon game images
            .innerJoinAndSelect(
                'pokemon.pokemonGameImages',
                'pokemonGameImage',
                'pokemonGameImage.game_version_group_id = :gameVersionGroupId',
                {
                    gameVersionGroupId: whereParam.gameVersionGroupId,
                }
            )
            // pokemon names
            .innerJoinAndSelect(
                'pokemon.pokemonNames',
                'pokemonName',
                'pokemonName.language_id = :languageId',
                {
                    languageId: whereParam.languageId,
                }
            )
            // pokemon type
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
            )
            .innerJoinAndSelect('pokemon.status', 'status');

        if (isEvolution) {
            builder
                // evolution
                .innerJoinAndSelect(
                    'pokemon.pokemonEvolutions',
                    'pokemonEvolution'
                )
                .innerJoinAndMapOne(
                    'pokemonEvolution.evolution',
                    EvolutionEntity,
                    'evolution',
                    'pokemonEvolution.evolution_id = evolution.id'
                )
                // evolution fromPokemon
                .innerJoinAndMapOne(
                    'evolution.fromPokemon',
                    PokemonEntity,
                    'fromPokemon',
                    'evolution.from_id = fromPokemon.id'
                )
                .innerJoinAndSelect(
                    'fromPokemon.pokemonGameImages',
                    'fromPokemonGameImage',
                    'fromPokemonGameImage.game_version_group_id = :gameVersionGroupId AND fromPokemonGameImage.is_main = :isMain',
                    {
                        gameVersionGroupId: whereParam.gameVersionGroupId,
                        isMain: true,
                    }
                )
                .innerJoinAndSelect(
                    'fromPokemon.pokemonNames',
                    'fromPokemonName',
                    'fromPokemonName.language_id = :languageId',
                    {
                        languageId: whereParam.languageId,
                    }
                )
                .innerJoinAndSelect(
                    'fromPokemon.pokemonTypes',
                    'fromPokemonType'
                )
                .innerJoinAndMapOne(
                    'fromPokemonType.type',
                    TypeEntity,
                    'f_type',
                    'fromPokemonType.type_id = f_type.id'
                )
                .innerJoinAndMapMany(
                    'f_type.typeNames',
                    TypeNameEntity,
                    'f_typeName',
                    'f_type.id = f_typeName.type_id AND f_typeName.language_id = :languageId',
                    { languageId: whereParam.languageId }
                )
                // evolution toPokemon
                .innerJoinAndMapOne(
                    'evolution.toPokemon',
                    PokemonEntity,
                    'toPokemon',
                    'evolution.to_id = toPokemon.id'
                )
                .innerJoinAndSelect(
                    'toPokemon.pokemonGameImages',
                    'toPokemonGameImage',
                    'toPokemonGameImage.game_version_group_id = :gameVersionGroupId AND toPokemonGameImage.is_main = :isMain',
                    {
                        gameVersionGroupId: whereParam.gameVersionGroupId,
                        isMain: true,
                    }
                )
                .innerJoinAndSelect(
                    'toPokemon.pokemonNames',
                    'toPokemonName',
                    'toPokemonName.language_id = :languageId',
                    {
                        languageId: whereParam.languageId,
                    }
                )
                .innerJoinAndSelect('toPokemon.pokemonTypes', 'toPokemonType')
                .innerJoinAndMapOne(
                    'toPokemonType.type',
                    TypeEntity,
                    't_type',
                    'toPokemonType.type_id = t_type.id'
                )
                .innerJoinAndMapMany(
                    't_type.typeNames',
                    TypeNameEntity,
                    't_typeName',
                    't_type.id = t_typeName.type_id AND t_typeName.language_id = :languageId',
                    { languageId: whereParam.languageId }
                );
        }
        return builder.getOne();
    }

    public findStatusById(whereParam: {
        id: number;
        languageId: number;
    }): Promise<PokemonEntity | undefined> {
        return (
            PokemonEntity.createQueryBuilder('pokemon')
                .where('pokemon.id = :id', { id: whereParam.id })
                // pokemon names
                .innerJoinAndSelect(
                    'pokemon.pokemonNames',
                    'pokemonName',
                    'pokemonName.language_id = :languageId',
                    {
                        languageId: whereParam.languageId,
                    }
                )
                .innerJoinAndSelect('pokemon.status', 'status')
                .getOne()
        );
    }
}
