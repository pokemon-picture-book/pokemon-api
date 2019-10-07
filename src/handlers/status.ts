import { send } from 'micro';
import { ServerRequest } from 'microrouter';
import { ServerResponse } from 'http';
import logger from '@/logging';

export default async (_: ServerRequest, res: ServerResponse) => {
    logger.info('access status ok.');
    await send(res, 200, { data: true });
};
