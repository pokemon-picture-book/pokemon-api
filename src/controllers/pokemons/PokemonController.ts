import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import TYPES from '@/registories/inversify.types';
import ISearchPokemonUsecase from '@/usecases/pokemons/ISearchPokemonUsecase';
import PokemonSearchResponse from '@/usecases/dto/models/PokemonSearchResponse';

@injectable()
export default class PokemonController {
    @inject(TYPES.ISearchPokemonUsecase)
    private usecase: ISearchPokemonUsecase;

    async search(_: Request, res: Response): Promise<void> {
        const response: PokemonSearchResponse[] = await this.usecase.search();

        res.status(201).json(response);
    }
}
