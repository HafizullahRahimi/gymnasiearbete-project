const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
const { ProgressPlugin } = require('webpack');

//Hash
const jsHash = false;
const imageHash = false;
const fontHash = false;
const htmlHash = false;
const cssHash = false;

module.exports = (env, { mode }) => {
    //Mode status
    let modeStatus = mode === 'production' ? 'production' : 'development';
    console.log(`MODE: ${modeStatus}`);

    return {
        //Mode
        mode: modeStatus, //production or development

        //Stats
        stats: mode === 'production' ? 'errors-only' : 'normal', //Production: 'errors-only', Development: 'normal'

        entry: {
            main: './src/index'
        },
        output: {
            filename: jsHash ? '[name][hash].js' : '[name].js',
            path: path.join(__dirname, 'dist'),
            clean: true, //Cleaning up the /dist folder
        },

        // Vendors
        optimization: {
            splitChunks: {
                chunks: 'all', //look at to all js files and create vendors.js
            },
        },

        //Devtool
        devtool: mode === 'production' ? false : 'source-map', //Production: false, Development: 'source-map'

        //DevServer
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
            },
            port: 9000, //default:8080
            open: true,
            hot: true, //default:true, Enable webpack's Hot Module Replacement feature.
        },
        module: {
            rules: [
                {
                    test: /\.(png|jpe?g|gif|svg)$/i, //images
                    type: 'asset/resource',
                    generator: {
                        filename: imageHash
                            ? 'assets/images/[name][hash][ext][query]'
                            : 'assets/images/[name][ext][query]', //dist/images
                    },
                },
                {
                    test: /\.(eot|ttf|woff|woff2|)$/i, //fonts
                    type: 'asset/resource',
                    generator: {
                        filename: fontHash
                            ? 'assets/fonts/[name][hash][ext][query]'
                            : 'assets/fonts/[name][ext][query]', //dist/fonts
                    },
                },
                {
                    test: /\.(s[ac]|c)ss$/i, // sass, scss nad css
                    use: [
                        mode === 'production'
                            ? MiniCssExtractPlugin.loader
                            : 'style-loader',
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ],
                },
                {
                    test: /\.m?js$/, //babel
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                },
            ],
        },
        //Plugins
        plugins: [
            new HtmlWebpackPlugin({
                // title: 'Home page',
                template: './src/index.html', //name template
                filename: htmlHash ? 'index[hash].html' : 'index.html', //name html file
                chunks: ['main'], //all js,css and scss are name bundle
                inject: 'body', // Build js file in Head or Body
                scriptLoading: 'blocking', // Head: defer, Body: blocking
            }),
            new MiniCssExtractPlugin({
                filename: cssHash ? 'assets/css/[name][hash].css' : 'assets/css/[name].css',
            }),
            new ProgressPlugin(),
        ],
    };
};
