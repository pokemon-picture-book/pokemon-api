import ExpressServer from './server';

const { PORT, HOST } = process.env;

export default new ExpressServer(PORT, HOST).start();
