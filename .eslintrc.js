module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parser": "babel-eslint",
    "parserOptions": {
        "sourceType": "module",
        "allowImportExportEverywhere": false
    },
    "rules": {
        "semi": [
            "error",
            "always"
        ],
        "no-console": 0
    },
    "globals": {
        "$": true
    }
};
