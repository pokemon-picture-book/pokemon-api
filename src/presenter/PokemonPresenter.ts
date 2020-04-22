import { injectable } from 'inversify';
import IPokemonPresenter from '@/domain/presenter/IPokemonPresenter';
import Pokemons from '@/domain/entities/Pokemons';
import PokemonSearchResponse from '@/usecases/dto/models/PokemonSearchResponse';

@injectable()
export default class PokemonPresenter implements IPokemonPresenter {
    public mappingAll(pokemons: Pokemons[]): PokemonSearchResponse[] {
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
