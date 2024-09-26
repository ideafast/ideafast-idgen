import jest from 'eslint-plugin-jest';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends('eslint:recommended'), {
    plugins: {
        jest,
        '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.commonjs,
            ...globals.node,
            ...jest.environments.globals.globals,
        },

        parser: tsParser,
        parserOptions: {
            warnOnUnsupportedTypeScriptVersion: false,
            tsconfigRootDir: __dirname
        },
        ecmaVersion: 2022,
        sourceType: 'module',
    },

    rules: {
        indent: ['error', 4],
        'linebreak-style': ['error', 'windows'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
    },
}, ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
).map(config => ({
    ...config,
    files: ['**/*.ts', '**/*.tsx'],
}))];