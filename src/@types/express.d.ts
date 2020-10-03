import { Response, Request } from 'express';

declare module 'express' {
    interface RequestParams {
        params?: any;
        query?: any;
        body?: any;
    }

    interface AppRequest<T extends RequestParams> extends Request {
        params: T['params'];
        query: T['query'];
        body: T['body'];
    }

    interface AppResponse<T> extends Response {
        status: Response['status'] | jest.Mock<any, any>;
        send: Response['send'] | jest.Mock<any, any>;
        json: Response['json'] | jest.Mock<any, any>;
    }

    interface AppErrorMessage {
        message: string;
        detail?: string;
    }
}
