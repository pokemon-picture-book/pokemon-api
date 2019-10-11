import Server from './server';
import routes from './routes';

export default new Server().router(routes).listen(process.env.PORT || 3000);
