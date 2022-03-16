const config = {
    parser: 'babel-eslint',
    extends: ['@magento'],
    parserOptions: {
        sourceType: 'module'
    },
    env: { es6: true },
    plugins: ['simple-import-sort', 'import'],
    rules: {
        'no-prototype-builtins': 'off',
        'no-undef': 'off',
        'no-useless-escape': 'off',
        'simple-import-sort/imports': [
            'error',
            {
                groups: [
                    // react and all external modules
                    ['^react', '^@?\\w'],
                    // pwa magento hooks, helpers, utils and graphql requests
                    [
                        '^@magento/venia-ui/lib/(?!components)',
                        '^@magento/peregrine',
                        '\\.gql$'
                    ],
                    // pwa components, reusable components with webpack alias and all modules with relative path
                    [
                        '^@magento/venia-ui/lib/components',
                        '^components',
                        '^\\.'
                    ],
                    // static files and styles
                    ['^static/', '\\.css$']
                ]
            }
        ],
        'simple-import-sort/exports': 'error',
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        'no-unused-vars': 'warn',
        'max-params': ['warn', 3],
        camelcase: ['warn', { properties: 'always' }],
        'import/no-cycle': 'error',
        'padding-line-between-statements': [
            'warn',
            {
                blankLine: 'always',
                prev: ['const', 'let', 'if', 'for', 'try'],
                next: 'return'
            }
        ],
        'array-callback-return': 'error',
        'no-param-reassign': 'error',
        'prefer-destructuring': 'warn',
        'no-return-assign': 'error',
        'no-useless-return': 'error',
        'no-extra-boolean-cast': 'error'
    }
};

module.exports = config;
