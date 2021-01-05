import PokemonEntity from '@/domain/entity/Pokemon.entity';
import TypeEntity from '@/domain/entity/Type.entity';
import TypeNameEntity from '@/domain/entity/TypeName.entity';
import IPokemonRepository from '@/domain/repository/IPokemon.repository';
import { injectable } from 'inversify';

@injectable()
export default class PokemonRepository implements IPokemonRepository {
    public findAll(
        languageId: number,
        gameVersionGroupId: number,
        regionIds: number[]
    ): Promise<PokemonEntity[]> {
        return PokemonEntity.createQueryBuilder('pokemon')
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
            .leftJoinAndSelect('pokemon.pokemonImages', 'pokemonImage')
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
                { languageId }
            )
            .orderBy({
                'pokemon.id': 'ASC',
                'pokemonType.order': 'ASC',
            })
            .getMany();
    }
}
