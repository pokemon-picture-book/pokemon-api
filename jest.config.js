module.exports = {
    roots: ['<rootDir>'],
    moduleDirectories: ['node_modules', 'src'],
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts?$': 'ts-jest'
    },
    testPathIgnorePatterns: [
        '<rootDir>/dist/',
        '<rootDir>/node_modules/',
        '<rootDir>/src/'
    ],
    testRegex: '(/test/.*|(\\.|/))(test|spec).ts?$',
    moduleFileExtensions: ['ts', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        '@/(.*)': '<rootDir>/src/$1',
        '~/(.*)': '<rootDir>/$1',
        '@test/(.*)': '<rootDir>/test/$1'
    },
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json'
        }
    },
    testTimeout: 300000
};
