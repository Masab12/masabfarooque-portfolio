import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      'no-console': 'error',
      'no-inline-comments': 'error',
      'spaced-comment': ['error', 'never'],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Literal[value=/[\\u{1F300}-\\u{1F9FF}\\u{2600}-\\u{26FF}\\u{2700}-\\u{27BF}]/u]',
          message: 'Emoji characters are not allowed in source code.',
        },
      ],
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
