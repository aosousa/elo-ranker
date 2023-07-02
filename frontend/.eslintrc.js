module.exports = {
    root: true,
    env: {
        'browser': true,
        'es2021': true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    parserOptions: {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    plugins: [
        'react'
    ],
    rules: {
        'no-console': 'warn',
        'no-debugger': 'warn',
        'object-shorthand': 'warn',
        'prefer-destructuring': 'off',
        'quotes': ['warn', 'single', { 'avoidEscape': true }],
        'default-param-last': 'warn',
        'space-before-blocks': 'warn',
        'no-param-reassign': 'warn',
        'prefer-spread': 'warn',
        'prefer-arrow-callback': 'warn',
        'arrow-spacing': 'warn',
        'arrow-parens': 'warn',
        'arrow-body-style': 'warn',
        'no-confusing-arrow': 'warn',
        'no-duplicate-imports': 'warn',
        'dot-notation': 'off',
        'no-restricted-properties': 'warn',
        'no-undef': 'warn',
        'prefer-const': 'warn',
        'eqeqeq': 'warn',
        'no-case-declarations': 'warn',
        'no-unneeded-ternary': 'warn',
        'spaced-comment': 'warn',
        'space-infix-ops': 'warn',
        'no-multiple-empty-lines': 'warn',
        'array-bracket-spacing': 'warn',
        'block-spacing': 'warn',
        'comma-spacing': ['warn', { 'before': false, 'after': true }],
        'key-spacing': 'warn',
        'no-unused-vars': 'warn'
    }
}
