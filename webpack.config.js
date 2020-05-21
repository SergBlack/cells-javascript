const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//определение в каком режиме сборки находимся
const isProdMode = process.env.NODE_ENV === 'production';
const isDevMode = !isProdMode;

// console.log('isProdMode ', isProdMode)
// console.log('isDevMode ', isDevMode)

//имя выходного файла, hash нужен для унификации файла для браузера
const filename = ext => isDevMode ? `bundle.${ext}` : `bundle.[hash].${ext}`;

module.exports = {
    context: path.resolve(__dirname, 'src'), // путь по которому вебпак будет собирать исходники
    // __dirname это системная переменная абсолютного пути, здесь это папка проекта cells
    mode: 'development', // режим продакшн или девелопмент
    entry: ['@babel/polyfill', './index.js'], // входная точка приложения
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'), // путь, где он будет сохранен
    },
    resolve: {
        extensions: ['.js'],
        // вместо import '../../../../core/Component'
        // использовать '@core/Component' (аналогично с @)
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core'),
        },
    },
    devtool: isDevMode ? 'source-map' : false,
    devServer: {
        port: 3000,
        hot: isDevMode,
    },
    plugins: [
        new CleanWebpackPlugin(), // очищает папку output.path от ненужных файлов после каждого ребилда(dist)
        new HTMLWebpackPlugin({
            // это шаблон хтмл документа, который будет лежать рядом с бандлом
            template: 'index.html',
            minify: {
                removeComments: isProdMode,
                collapseWhitespace: isProdMode,
            }
        }),
        new CopyPlugin({  // копирует фавикон в папку dist после каждого ребилда
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist'),
                },
            ],
        }),
        new MiniCssExtractPlugin({  //выносит css стили в отдельный файл в папке dist после каждого ребилда
            filename: filename('css'),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // минифицирует css
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }

                }
            }
        ],
    },
}

