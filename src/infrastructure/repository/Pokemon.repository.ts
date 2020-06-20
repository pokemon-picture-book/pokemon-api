import Pokemon from '@/domain/entity/Pokemon.entity';
import Type from '@/domain/entity/Type.entity';
import TypeName from '@/domain/entity/TypeName.entity';
import IPokemonRepository from '@/domain/repository/IPokemon.repository';
import { injectable } from 'inversify';

@injectable()
export default class PokemonRepository implements IPokemonRepository {
    // public findAll(): Promise<Pokemon[]> {
    //     return Pokemon.find().catch(err => {
    //         throw err;
    //     });
    // }

    public findAll(
        languageId: number,
        gameVersionGroupId: number,
        regionIds: number[]
    ): Promise<Pokemon[]> {
        return Pokemon.createQueryBuilder('pokemon')
            .innerJoin(
                'pokemon.region',
                'region',
                'region.id IN (:regionIds)',
                { regionIds }
            )
            .innerJoinAndSelect(
                'pokemon.pokemonGameImages',
                'pokemonGameImage',
                'pokemonGameImage.game_version_group_id = :gameVersionGroupId',
                { gameVersionGroupId }
            )
            .innerJoinAndSelect(
                'pokemon.pokemonNames',
                'pokemonName',
                'pokemonName.language_id = :languageId',
                { languageId }
            )
            .innerJoinAndSelect('pokemon.pokemonImages', 'pokemonImage')
            .innerJoinAndSelect('pokemon.pokemonTypes', 'pokemonType')
            .innerJoinAndMapOne(
                'pokemonType.type',
                Type,
                'type',
                'pokemonType.type_id = type.id'
            )
            .innerJoinAndMapOne(
                'type.typeNames',
                TypeName,
                'typeName',
                'type.id = typeName.type_id AND typeName.language_id = :languageId',
                { languageId }
            )
            .orderBy({
                'pokemon.order': 'ASC',
                'pokemonType.order': 'ASC'
            })
            .getMany();
    }
}
