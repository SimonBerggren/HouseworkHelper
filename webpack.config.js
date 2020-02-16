const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = env => {
    const { client, dev, serverPort, clientPort } = env;

    const clientConfig = {
        entry: path.resolve('src', 'client', 'index.tsx'),
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
            proxy: {
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
            }),
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
                    test: /\.(tsx?|js)$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve('dist', client ? 'client' : 'server'),
        }
    };
};