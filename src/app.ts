import { withNamespace, router, get } from 'microrouter';

import dbConnection from '@/db/dbConnection';
import status from '@/handlers/status';
import notFound from '@/handlers/notFound';
import pokemonList from '@/handlers/pokemonRoutes/list';

const pokemonRoute = withNamespace('/pokemon');

dbConnection.connect();

process.on('SIGINT', async () => {
  await dbConnection.disconnect();
  process.exit();
});

export default router(
  get('/status', status),
  pokemonRoute(get('/', pokemonList)),
  get('/*', notFound)
);
