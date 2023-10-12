module.exports = {
    env: {
        "browser": true,
        "es2021": true,
        "node": true
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        ecmaVersion: 'latest'
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'prettier',
    ],
    rules: {
        'vue/require-default-prop': 'off'
    },
}
