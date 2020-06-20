import { injectable } from 'inversify';
import IPokemonPresenter from '@/domain/presenter/IPokemon.presenter';
import Pokemon from '@/domain/entity/Pokemon.entity';
import PokemonSearchResponse from '@/usecase/dto/model/PokemonSearchResponse';

@injectable()
export default class PokemonPresenter implements IPokemonPresenter {
    public mappingAll(pokemons: Pokemon[]): PokemonSearchResponse[] {
        return pokemons.map(
            (p): PokemonSearchResponse => new PokemonSearchResponse(p.id)
        );
    }
}
