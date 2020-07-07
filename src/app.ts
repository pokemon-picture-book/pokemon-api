import { dbConnection } from '@/driver';
import app from '@/server';
import * as http from 'http';
import * as os from 'os';

dbConnection();

const port = process.env.PORT || '3000';
const host = process.env.HOST || 'localhost';
http.createServer(app).listen(Number(port), host, () => {
    console.info(
        `up and running in ${process.env.NODE_ENV ||
            'development'} @: ${os.hostname()} on port: ${port}, host: ${host}`
    );
});
