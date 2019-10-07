import { send } from 'micro';
import { ServerRequest, ServerResponse } from 'microrouter';
import logger from '@/logging';
import Pokemons from '@/entities/Pokemons';
import listUsecase from '@/usecases/pokemon/list-usecase';

export default async (_: ServerRequest, res: ServerResponse) => {
    const pokemons: Pokemons[] = await listUsecase().catch(err => {
        logger.error(err);
        throw new Error(err);
    });

    await send(res, 200, pokemons);
};
