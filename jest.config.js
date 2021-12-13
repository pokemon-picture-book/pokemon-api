module.exports = {
    collectCoverageFrom: [
        'src/**/*.{js,ts}',
        '!<rootDir>/node_modules/'
    ],
    testResultsProcessor: 'jest-sonar-reporter',
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
    modulePathIgnorePatterns: [
        '<rootDir>/src/04-framework/db/migrations',
        '<rootDir>/src/04-framework/db/seed'
    ],
    testTimeout: 300000
};
