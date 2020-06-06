import { injectable } from 'inversify';
import IPokemonPresenter from '@/domain/presenter/IPokemonPresenter';
import Pokemons from '@/domain/entity/Pokemons';
import PokemonSearchResponse from '@/usecase/dto/model/PokemonSearchResponse';

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
