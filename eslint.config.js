import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';


export default tseslint.config([
  {
    ignores: ['dist', 'node_modules', 'vit-env.d.ts',  'eslint.config.js'],
  },
  // Config files (vite.config.ts, etc.)
  {
    files: ['vite.config.ts'],
    languageOptions: {
      globals: globals.node,
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.node.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  // Main app files
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['vite.config.ts'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tseslint.plugin,
      import: importPlugin,
      prettier,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {},
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    rules: {
      // Airbnb-style rules
      'react/react-in-jsx-scope': 'off',
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
      'react/jsx-props-no-spreading': 'off',
      'react/require-default-props': 'off',

      // React Hooks
      ...reactHooks.configs.recommended.rules,

      // Import rules
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'import/prefer-default-export': 'off',

      // Custom rules from your config
      'max-lines-per-function': ['error', 40],
      'no-magic-numbers': [
        'error',
        {
          ignore: [0, 1, -1, 2],
          ignoreArrayIndexes: true,
          enforceConst: true,
          detectObjects: false,
        },
      ],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    
      'prettier/prettier': 'error',
      'no-empty-pattern': 'off',
    },
  },
]);