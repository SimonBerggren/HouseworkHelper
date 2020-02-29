const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

const serverPort = 80;
const clientPort = 8080;

module.exports = env => {
    const { client, dev, proxy } = env;

    const clientConfig = {
        entry: path.resolve('src', 'client', 'index.tsx'),
        devtool: 'cheap-eval-source-map',
        target: 'web',
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve('src', 'client', 'index.html')
            })
        ],
        devServer: {
            writeToDisk: true,
            compress: true,
            port: clientPort,
            index: '',
            contentBase: path.join(__dirname, 'dist', 'client'),
            proxy: proxy && {
                '**': `http://localhost:${serverPort}`
            }
        },
    };

    const serverConfig = {
        entry: path.resolve('src', 'server', 'server.ts'),
        target: 'node',
        plugins: [
            new NodemonPlugin({
                ext: 'ts,tsx',
                args: [serverPort],
            })
        ],
        externals: [nodeExternals()]
    };

    const config = client ? clientConfig : serverConfig;

    return {
        ...config,
        mode: dev ? 'development' : 'production',
        watch: dev,
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    },
                },
                {
                    test: /\.(png)$/,
                    use: {
                        loader: 'file-loader'
                    }
                }
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            filename: '[name].js',
            chunkFilename: '[name].bundle.js',
            path: path.resolve('dist', client ? 'client' : 'server'),
        },
        optimization: {
            minimize: !dev,
            minimizer: [new TerserPlugin()],
        }
    };
};