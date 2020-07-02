const path = require('path');
const webpack = require('webpack');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src/app.ts'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    optimization: {
        minimize: false
    },
    resolve: {
        modules: ['node_modules', path.resolve(__dirname, 'src')],
        extensions: ['.ts', '.js', '.json'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@t': path.resolve(__dirname, 'src', '@types'),
            '~': path.resolve(__dirname)
        }
    },
    plugins: [
        new CopyWebpackPlugin(['ormconfig.js']),
        new webpack.IgnorePlugin(/^pg-native$/),
        new FilterWarningsPlugin({
            exclude: [
                /mongodb/,
                /mssql/,
                /mysql/,
                /mysql2/,
                /oracledb/,
                /pg/,
                /pg-native/,
                /pg-query-stream/,
                /react-native-sqlite-storage/,
                /redis/,
                /sqlite3/,
                /sql.js/,
                /typeorm-aurora-data-api-driver/
            ]
        })
    ],
    target: 'node',
    module: {
        rules: [
            {
                test: /\.ts$/,
                include: [path.resolve(__dirname, 'src')],
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: path.resolve(__dirname, 'tsconfig.json')
                    }
                }
            }
        ]
    }
};
