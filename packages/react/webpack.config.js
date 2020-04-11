const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');



const buildPath = path.resolve(__dirname);

module.exports = {
    devtool: 'source-map',
    entry: './src/index.tsx',
    output: {
        filename: `./dist/breakpoint-service.react.js`,
        path: buildPath,
        library: "breakpointService.react",
        libraryTarget: "umd",
        libraryExport: "default"
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    module: {
        rules: [
            {
                test: /\.(ts)x?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
                    "plugins": [
                        "@babel/proposal-class-properties"
                    ]
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            sassOptions: {
                                outputStyle: 'compressed',
                                includePaths: [path.join(__dirname, '../../node_modules')]
                            },
                        },
                    },
                ],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'dist/breakpoint-service.css'
        }),
    ],
    externals: [
        'react',
        "@breakpoint-service/core"
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        modules: [path.join(__dirname, '../../node_modules')],
        alias: {
            // '@breakpoint-service/core': path.resolve(__dirname, '../core/src/')
        }
    }
};
