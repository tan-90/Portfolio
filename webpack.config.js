var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var copyPlugin = new CopyWebpackPlugin([
    './src/index.html',
    {from: './src/assets', to: 'assets'}
]);

module.exports = {
    // entry: {
    //     a: "./a",
    //     b: "./b",
    //     c: ["./c", "./d"]
    // },
    // output: {
    //     path: path.join(__dirname, "dist"),
    //     filename: "[name].entry.js"
    // }

    entry: {
        react: './src/index.jsx',
        threejs: './src/threejs/main.js'
    },
    
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].entry.js',
        publicPath: '/'
    },
    resolve: {
        extensions: [
            '.js',
            '.jsx'
        ]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                'env',
                                'react'
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]___[hash:base64:5]'
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        copyPlugin
    ]
};