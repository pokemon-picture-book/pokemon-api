import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import ISearchPokemonUsecase from '@/usecases/pokemons/ISearchPokemonUsecase';
import TYPES from '@/registories/inversify.types';
import IPokemonRepository from '@/domain/repositories/IPokemonRepository';
import Pokemons from '@/domain/entities/Pokemons';
import PokemonSearchResponse from '@/usecases/dto/models/PokemonSearchResponse';

@injectable()
export default class SearchPokemonInteractor implements ISearchPokemonUsecase {
    @inject(TYPES.IPokemonRepository)
    private repository: IPokemonRepository;

    public async search(): Promise<PokemonSearchResponse[]> {
        const pokemons: Readonly<Pokemons>[] = await this.repository.findAll();
        return pokemons.map(
            (p): PokemonSearchResponse =>
                new PokemonSearchResponse(
                    p.id,
                    p.code,
                    p.name,
                    p.flavorText,
                    p.generationNo
                )
        );
    }
}
