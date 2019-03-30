const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackSynchronizableShellPlugin = require('webpack-synchronizable-shell-plugin');

var copyPlugin = new CopyWebpackPlugin([
    './src/index.html',
    {
        from: './assets',
        to: 'assets'
    }
]);

var syncShellPlugin = new WebpackSynchronizableShellPlugin({
    onBuildStart: {
        scripts: [
            'echo Generating scss typings.',
            'atsm -p src/**/*.scss'
        ],
        blocking: true
    }
});

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: [
            '.ts',
            '.tsx',
            '.js',
            '.json'
        ]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            },
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]___[hash:base64:5]'
                        }
                    },
                    'resolve-url-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    plugins: [
        syncShellPlugin,
        copyPlugin
    ]
};
