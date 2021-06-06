import driver from '@/driver';

describe('Unit test for driver', () => {
    test('異常: 実行環境変数が格納されていない場合、throw されるか', (done) => {
        expect(driver.connect('')).rejects.toEqual(
            new Error(
                'Please specify either "development" | "test" | "production"'
            )
        );
        done();
    });
});
