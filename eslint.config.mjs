import globals from "globals";
import pluginJs from "@eslint/js";
import html from "@html-eslint/eslint-plugin";
import htmlParser from "@html-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
    {
        ignores: [
            "**/dist/**",
            "**/node_modules/**",
            "superhero-arena/**",
            "product-list-search-and-filter/**",
            "react-test/**",
            "tough-pagination/**",
            "superHero/**"
        ]
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            }
        }
    },
    pluginJs.configs.recommended,
    {
        files: ["**/*.html"],
        languageOptions: {
            parser: htmlParser,
        },
        plugins: {
            "@html-eslint": html,
            "html": html,
        },
        rules: {
            ...html.configs.recommended.rules,
            "html/indent": "off",
            "html/require-closing-tags": "off",
            "html/no-extra-spacing-attrs": "off",
            "html/quotes": "off",
            "html/closing-bracket-newline": "off",
            "html/element-newline": "off",
            "html/no-trailing-spaces": "off",
            "html/max-len": "off",
            "html/attrs-newline": "off",
        },
    },
    eslintConfigPrettier
];
