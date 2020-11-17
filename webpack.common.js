const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const config = {
    mode: 'development',

    context: path.resolve(__dirname, 'src'),

    entry: './default/assets/js/src/bootstrap.ts',

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.sass$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'resolve-url-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            sassOptions: {
                                style: 'compact',
                                unixNewlines: true
                            },
                        }
                    },
                ],
            },
            {
                test: /\.ttf$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'default/assets/fonts',
                    publicPath: '../fonts',
                    name: '[name].[ext]',
                },
            },
        ]
    },

    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    context: path.resolve(__dirname, 'src'),
                    from: 'plugin.js',
                    to: path.resolve(__dirname, 'bin'),
                },
                {
                    context: path.resolve(__dirname, 'src/default/assets/images'),
                    from: '*.png',
                    to: path.resolve(__dirname, 'bin/default/assets/images'),
                },
            ],
        }),
    ],
}

module.exports = config;