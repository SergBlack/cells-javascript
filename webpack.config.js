const path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'src'), // путь по которому вебпак будет проверять исходники
    // __dirname это системеная переменная абсолютного пути, здесь это папка проекта cells
    mode: 'development', // режим продакшн или девелопмент
    entry: './index.js', // входная точка приложения
    output: {
        filename: 'bundle.js', //имя выходного файла
        path: path.resolve(__dirname, 'dist'), // путь, где он будет сохранен
    }
}

