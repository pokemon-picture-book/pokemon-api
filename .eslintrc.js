module.exports = {
    extends: [
        'airbnb-base',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended'
    ],
    plugins: [
        'prettier',
        '@typescript-eslint'
    ],
    parser: '@typescript-eslint/parser',
    env: { 'node': true },
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
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                tabWidth: 4
            }
        ],
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