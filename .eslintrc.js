module.exports = {
    extends: [
        'airbnb-base',
        'prettier'
    ],
    plugins: [
        '@typescript-eslint'
    ],
    ignorePatterns: [
      'src/04-framework/db/migrations/*.ts',
      'src/04-framework/db/seed/*.json',
      '.eslintrc.js',
      'jest.config.js',
      'nodemon.json',
      'ormconfig.js',
      'package*.json',
      'tsconfig.json',
      'webpack*js'
    ],
    env: { 'node': true },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
        project: './tsconfig.json'
    },
    globals: {
      jest: false,
      function: false
    },
    rules: {
      'no-undef': 'warn',
      'no-console': process.env.NODE_ENV === 'development' ? 'error' : 'off',
      'import/no-unresolved': 'off',
      'no-unused-vars': 'off',
      'no-restricted-syntax': 'off',
      'no-await-in-loop': 'off',
      'import/no-duplicates': 'off',
      'class-methods-use-this': 'off',
      'max-classes-per-file': 'off'
    },
    overrides: [
      {
        files: [
          '**/__test__/*.{j,t}s?(x)',
          '**/test/integration/**/*.test.{j,t}s?(x)',
          '**/test/unit/**/*.test.{j,t}s?(x)'
        ],
        env: {
          'jest/globals': true
        },
        plugins: [
          'jest'
        ]
      }
    ]
}