import driver from '@/driver';
import app from '@/server';
import * as http from 'http';
import * as os from 'os';
import { Worker } from 'cluster';

const cluster = require('cluster');

const port = process.env.PORT || '3001';
const host = process.env.HOST || '0.0.0.0';

// CPU のコア (スレッド) 数取得
const osCUPLen = os.cpus().length;

if (cluster.isPrimary) {
    console.info(
        `up and running in ${
            process.env.NODE_ENV || 'development'
        } @: ${os.hostname()} on port: ${port}, host: ${host}`
    );

    // Worker 生成
    [...Array(osCUPLen)].forEach((_, i) => {
        console.info(`Master : Cluster Fork ${i}`);
        cluster.fork();
    });

    // Worker クラッシュ時の再生成処理
    cluster.on('exit', (worker: Worker, code: number, signal: string) => {
        console.warn(
            `[${worker.id}] Worker died : [PID ${worker.process.pid}] [Signal ${signal}] [Code ${code}]`
        );
        cluster.fork();
    });
} else {
    console.info(
        `[${cluster.worker?.id}] [PID ${cluster.worker?.process.pid}] Worker`
    );

    driver.connect();

    http.createServer(app).listen(Number(port), host);
}
