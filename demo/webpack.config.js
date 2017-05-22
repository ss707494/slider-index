const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

const defaultPath = 'dist';

const config = {
    devtool: 'source-map',
    entry: {
        app: ['./demo/app.js']
    },
    output: {
        path: path.resolve(__dirname, defaultPath, ''),
        filename: '[name].js',
        // publicPath: '/' + defaultPath
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', "es2015", 'stage-0'],
                        "plugins": [
                            ["transform-runtime", {
                                "helpers": false, // defaults to true
                                "polyfill": false, // defaults to true
                                "regenerator": true, // defaults to true
                                "moduleName": "babel-runtime" // defaults to "babel-runtime"
                            }]
                        ]
                    }
                },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            template: './demo/index.html',
        })
    ],
};
if (false) {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true, // React doesn't support IE8
                warnings: false
            },
            mangle: {
                screw_ie8: true
            },
            output: {
                comments: false,
                screw_ie8: true
            }
        })
    )
}

module.exports = config;