import { ChildRouter, OperationRouter } from 'app-router';

const httpMethods = {
    all: 'all',
    get: 'get',
    post: 'post',
    put: 'put',
    delete: 'delete',
    patch: 'patch',
    options: 'options',
    head: 'head'
} as const;

type SupportedHttpMethod = keyof typeof httpMethods;

export const isSupportedHttpMethod = (
    method: string
): method is SupportedHttpMethod =>
    Object.values(httpMethods).includes(method as SupportedHttpMethod);

export const isChildRouter = (
    router: OperationRouter | ChildRouter
): router is ChildRouter => 'children' in router;

export const isOperationRouter = (
    router: OperationRouter | ChildRouter
): router is OperationRouter => 'action' in router;

export default {};
