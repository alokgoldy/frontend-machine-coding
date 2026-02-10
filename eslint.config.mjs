import globals from "globals";
import pluginJs from "@eslint/js";
import html from "@html-eslint/eslint-plugin";
import htmlParser from "@html-eslint/parser";

export default [
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
            "html/indent": ["error", 2],
        },
    }
];