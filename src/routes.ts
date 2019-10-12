import { Application } from 'express';
import pokemonRouter from './controllers/pokemons/router';

/**
 * 全ての route を管理します.
 * @param app express app
 */
export default function routes(app: Application): void {
    app.use('/pokemon-api/v1/pokemons', pokemonRouter);
}
