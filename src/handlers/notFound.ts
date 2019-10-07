import { createError, sendError } from 'micro';
import { ServerRequest } from 'microrouter';
import { ServerResponse } from 'http';
import logger from '@/logging';

export default async (req: ServerRequest, res: ServerResponse) => {
    const error = new Error();
    const httpError = createError(404, 'not found.', error);
    logger.error('Endpoint is not found. ', error);

    await sendError(req, res, httpError);
};
