import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import TYPES from '@/registories/registory';
import ISearchPokemonUsecase from '@/usecases/search-pokemon-usecase';
import Pokemons from '@/domain/entities/Pokemons';

@injectable()
export default class Controller {
    @inject(TYPES.ISearchPokemonUsecase) private usecase: ISearchPokemonUsecase;

    public async search(_: Request, res: Response): Promise<void> {
        const pokemons: Pokemons[] = await this.usecase.search();
        res.status(201).json(pokemons);
    }
}
