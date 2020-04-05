const path = require('path');
const globby = require('globby');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const packages = globby.sync(['packages/**'], {
    onlyDirectories: true, deep: 0
});


const entries = {};

packages.map((pkg) => {
    const entry = pkg.split('/')[1];
    entries[entry] = `./${pkg}/src/index.ts`;
});

// entries['responsive-breakpoint'] = './packages/core/src/scss/main.scss';

const buildPath = path.resolve(__dirname);

module.exports = {
    devtool: 'source-map',
    entry: './src/index.ts',
    output: {
        filename: `./dist/breakpoint-service.js`,
        path: buildPath,
        library: "breakpointService",
        libraryTarget: "umd",
        libraryExport: "default"
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-typescript'],
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
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        modules: [path.join(__dirname, '../../node_modules')],
        alias: {
            '@breakpoint-service': path.resolve(__dirname, '../packages/')
        }
    }
};
