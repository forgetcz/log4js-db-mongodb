module.exports = {
    ...require('@onio/eslint-config-typescript'),
    overrides: [
        {
            files: ['*.js'],
            rules: {
                '@typescript-eslint/no-var-requires': 'on',
                '@typescript-eslint/no-empty-function': 'off',
            },
        },
    ],
    rules: {
        'no-unused-vars': [
            'error',
            {
                args: 'none',
                vars: 'all',
                varsIgnorePattern: '^_',
                argsIgnorePattern: '^_',
            },
        ],
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
    },
    env: {
        jest: true,
    },
};
