module.exports = {
    'parser': "babel-eslint",
    'env': {
        'commonjs': true,
        'es6': true,
        'jest': true,
        'browser': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'airbnb'
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 2018
    },
    'plugins': [
        'react',
        'jest'
    ],
    'rules': {
        'indent': [
            'error',
            2
        ],
        'linebreak-style': [
            'error',
            'windows'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
		"react/jsx-filename-extension": [
			1, 
			{ "extensions": [".js", ".jsx"] }
        ],
        "react/jsx-indent": [ 2, 2 ],
        "react/prop-types": [0],
        'no-plusplus': [0],
        'no-param-reassign': [0],
        "comma-dangle": [2, "only-multiline"],
        "react/destructuring-assignment": [0]
    }
};