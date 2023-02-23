module.exports = {
    root: true,

    extends: [
        "eslint-config-airbnb-base/rules/errors",
        "eslint-config-airbnb-base/rules/node",
        "eslint-config-airbnb-base/rules/style",
        "eslint-config-airbnb-base/rules/variables",
        "eslint-config-airbnb-base/rules/es6",
    ]
        .map(require.resolve),

    env: {
        browser: true,
    },

    plugins: ["import"],

    rules: {
        "max-len": ["error", {
            "code": 100
        }],
        "no-nested-ternary": ["off"],
        "no-underscore-dangle": ["off"],
        "object-curly-spacing": ["error", "never"],
        "require-jsdoc": ["off"],
        "no-invalid-this": ["off"],
        "sort-imports": ["error", {
            "ignoreCase": false,
            "ignoreDeclarationSort": false,
            "ignoreMemberSort": false,
            "memberSyntaxSortOrder": ["none", "all", "single", "multiple"],
            "allowSeparatedGroups": false
        }],
        "import/no-extraneous-dependencies": [
            "error", {
                devDependencies: false,
            },
        ],
    },
};