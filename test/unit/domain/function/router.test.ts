import {
    isSupportedHttpMethod,
    isChildRouter,
    isOperationRouter,
} from '@/domain/function/router.function';
import { ChildRouter, OperationRouter } from 'app-router';

describe('Unit test for router function', () => {
    test('正常: サポートしている Http Method 文字列で call した場合、true となるか', (done) => {
        expect(isSupportedHttpMethod('get')).toBeTruthy();
        done();
    });

    test('正常: ChildRouter 型の引数で call した場合、true となるか', (done) => {
        const child: ChildRouter = {
            path: '',
            children: [
                {
                    path: '/test',
                    method: 'get',
                    action: () => {},
                },
            ],
        };
        expect(isChildRouter(child)).toBeTruthy();
        done();
    });

    test('正常: OperationRouter 型の引数で call した場合、true となるか', (done) => {
        const operation: OperationRouter = {
            path: '/test',
            method: 'get',
            action: () => {},
        };
        expect(isOperationRouter(operation)).toBeTruthy();
        done();
    });

    test('異常: サポートしていない Http Method 文字列で call した場合、false となるか', (done) => {
        expect(isSupportedHttpMethod('xxxxx')).toBeFalsy();
        done();
    });

    test('異常: ChildRouter ではない型の引数で call した場合、false となるか', (done) => {
        const notChild1: any = {
            xxxxx: '',
        };
        expect(isChildRouter(notChild1)).toBeFalsy();

        const notChild2: OperationRouter = {
            path: 'xxxxx',
            method: 'xxxxx',
            action: () => {},
        };
        expect(isChildRouter(notChild2)).toBeFalsy();

        done();
    });

    test('異常: OperationRouter ではない型の引数で call した場合、false となるか', (done) => {
        const notOperation1: any = {
            xxxxx: '',
        };
        expect(isOperationRouter(notOperation1)).toBeFalsy();

        const notOperation2: ChildRouter = {
            path: '',
            children: [
                {
                    path: 'xxxxx',
                    method: 'xxxxx',
                    action: () => {},
                },
            ],
        };
        expect(isOperationRouter(notOperation2)).toBeFalsy();

        done();
    });
});
