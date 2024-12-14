// import html
import fileInclude from "gulp-file-include"; // Подключение HTML файлов друг в друга
import typograf from "gulp-typograf"; // Подготовока текста и переносов
import prettier from "@bdchauvette/gulp-prettier"; // Форматтер
// import scss
import * as dartSass from "sass"; // Необходимый пакет для ккомпилятора SASS
import gulpSass from "gulp-sass"; // Компиляция SASS и SCSS файлов
import sassGlob from "gulp-sass-glob"; // Импорт пакетов сразу несколько файлов записью './blocks/*.scss'

import autoprefixer from "gulp-autoprefixer"; // Автоматическое добавление префиксов в CSS
import groupMedia from "gulp-group-css-media-queries"; // Группировка одинаковых CSS медиа запросов
// import html & scss
import replace from "gulp-replace"; // Замена путей подключения изображений в итоговых файлах
// import js
import babel from "gulp-babel"; // Преобразует Java Script в старый стандарт для старых браузеров
import webpack from "webpack-stream"; //  Пакет для запуска webpack в режиме потока
import webpackConfig from "./../webpack.config.js"; // Импортируем конфигурацию Webpack
// import img
import imagemin, { gifsicle, mozjpeg, optipng } from "gulp-imagemin"; // Сжатие изображений
import imageminWebp from "imagemin-webp"; // Конвертация изображений в формат WebP
// import svg
import svgsprite from "gulp-svg-sprite";
// import notify
import plumber from "gulp-plumber"; // Обработка ошибок без разрыва потока
import notify from "gulp-notify"; // Вывод оповещения об ошиюках
// import clean
import clean from "gulp-clean"; // Удаление файлов и папок предыдущих сборок
import fs from "fs"; // Работа с проводником
// import other utilities
import changed, { compareContents } from "gulp-changed"; // Отслеживание измененных файлов c отдельным подключением функции compareContents
import rename from "gulp-rename"; // Переименование файлов
import gulpIf from "gulp-if"; // Создание условий для задачи
import server from "gulp-server-livereload"; // Локальный веб-сервер с включённой живой перезагрузкой

//==========Settings============//

// binding gulp-sass to dart-sass
const sass = gulpSass(dartSass);

// Settings fileInclude
const fileIncludeSetting = {
  prefix: "@@", // @@include('blocks/header.html')
  basepath: "@file", // Путь к включаемым файлам будет относительным к текущему файлу
  maxRecursion: 100, // Масимальная глубина вложенности
};

// Settings prettier
const prettierOptions = {
  tabWidth: 4, // Кол-во пробелов для одного уровня отступа
  useTabs: true, // Табуляция вместо пробелов
  printWidth: 100, // Максимальная ширина строки
  trailingComma: "es5", // Добавление , в конуе элементов
  bracketSpacing: false, // Пробелы между фигурными скобками
};

// Settings plumber
const plumberNotify = (title) => {
  return {
    errorHandler: notify.onError({
      title: title,
      message: "Error <%= error.message %>",
      sound: false,
    }),
  };
};

// Settings gulpIf
const isImageFile = (file) => {
  return file.extname === ".png" || file.extname === ".jpg" || file.extname === ".jpeg";
};

// Settings svgsprite
const svgSprite = {
  // Режим, который создаёт SVG-спрайт
  mode: {
    symbol: {
      sprite: "../sprite.svg", // Путь и имя для итогового файла спрайта
    },
  },
  // Трансформация SVG-файлов перед их объединением в спрайт
  shape: {
    transform: [
      {
        // Плагин оптимизации SVG-файлов
        svgo: {
          js2svg: { indent: 4, pretty: true }, // Оптимизация SVG будет форматирован с отступом в 4 пробела и отформатированна.
          // Плагин удаляет атрибуты fill и stroke
          plugins: [
            {
              name: "removeAttrs",
              params: {
                attrs: "(fill|stroke)",
              },
            },
          ],
        },
      },
    ],
  },
};

// Settings server
const serverOptions = {
  livereload: true,
  open: true,
};

// Settings autoprefixer
const autoprefixerOptions = {
  cascade: false,
  grid: true,
  overrideBrowserslist: ["last 5 versions"],
};

//===========Tasks=============//

// Задача gulp clean | Удаление файлов и папки с результатами предыдущей сборки
export const cleanDocs = (done) => {
  // Условие: Есть или нет папка с проектом
  if (fs.existsSync(app.paths.html.docs)) {
    return app.gulp
      .src(app.paths.html.docs, { read: false }) // read: false - запрещаем читать файлы внутри папки с проектом
      .pipe(clean({ force: true })); // force: true - удаляем файлы требующие дополнительные разрешения
  } else {
    console.log("Error: Folder not found");
    done();
  }
};

// Задача gulp html | Встраивание HTML
export const htmlDocs = () => {
  return app.gulp
    .src(app.paths.html.src) // Забираем .html из папки src/html/
    .pipe(changed(app.paths.html.docs, { hasChanged: compareContents })) // compareContents - обновление .html при обновлении дочерних элементов в папке /blocks
    .pipe(plumber(plumberNotify("HTML"))) // Обработка ошибок в HTML
    .pipe(fileInclude(fileIncludeSetting)) // Сборка .html из папки /blocks в единый фаил
    .pipe(
      replace(
        /(?<=src=|href=|srcset=)(['"])(\.(\.)?\/)*(img|images|fonts|css|scss|sass|js|files|audio|video)(\/[^\/'"]+(\/))?([^'"]*)\1/gi,
        "$1./$4$5$7$1"
      )
    ) // Автоисправление относительных путей к файлам на абсолютные в итоговой сборке
    .pipe(
      typograf({
        locale: ["ru", "en-US"],
        htmlEntity: { type: "digit" },
        safeTags: [
          ["<\\?php", "\\?>"],
          ["<no-typography>", "</no-typography>"],
        ],
      })
    ) // Добавление неразрывных пробелов для переносов согласно правилам языка
    .pipe(prettier(prettierOptions))
    .pipe(app.gulp.dest(app.paths.html.docs));
};

// Задача gulp sass | Препроцессор SASS & SCSS
export const sassDocs = () => {
  return (
    app.gulp
      .src(app.paths.styles.src) // Забираем .scss из папки src/scss/
      .pipe(changed(app.paths.styles.docs)) // Отслеживание измененных файлов в папке с итоговой сборкой
      .pipe(plumber(plumberNotify("SCSS"))) // Обработка ошибок в HTML
      //.pipe(sourceMaps.init()) // Создание файла sourcemaps
      .pipe(sassGlob()) // Импорт блоков из папки './blocks/*.scss'
      .pipe(sass()) // Преобразование *.scss в *.css
      .pipe(autoprefixer(autoprefixerOptions)) // Автоматическое добавление префиксов в CSS !Подключать после SASS обработка CSS
      .pipe(groupMedia()) // Группируем медиазопросы
      .pipe(replace(/(['"]?)(\.\.\/)+(img|images|fonts|css|scss|sass|js|files|audio|video)(\/[^\/'"]+(\/))?([^'"]*)\1/gi, "$1$2$3$4$6$1")) // Автоисправление относительных путей к файлам на абсолютные в итоговой сборке
      //.pipe(sourceMaps.write(".")) // Запись sourcemaps в фаил стилей
      .pipe(app.gulp.dest(app.paths.styles.docs))
  );
};

// Задача gulp img | Копирования изображений
export const imgDocs = () => {
  return app.gulp
    .src(app.paths.img.srcFull, { encoding: false }) // encoding: false - отмена конвертирования данных в текстовую кодировку
    .pipe(changed(app.paths.img.docs)) // Отслеживание измененных файлов в папке с итоговой сборкой
    .pipe(
      imagemin([
        imageminWebp({
          quality: 85,
        }),
      ])
    ) // Оптимизации изображений и конвертация в WebP с уровнем сжатия 85
    .pipe(gulpIf(isImageFile, rename({ extname: ".webp" }))) // Переименование в .webp только для изображений (исключая папки)
    .pipe(app.gulp.dest(app.paths.img.docs)) // Выклажывание изображений в формате .webp в итоговую сборку
    .pipe(app.gulp.src(app.paths.img.src, { encoding: false })) // Забираем изображение из /src/img/
    .pipe(changed(app.paths.img.docs)) // Отслеживание измененных файлов в папке с итоговой сборкой
    .pipe(
      imagemin([gifsicle({ interlaced: true }), mozjpeg({ quality: 85, progressive: true }), optipng({ optimizationLevel: 5 })], { verbose: true })
    ) // Повторная оптимизация остальных изображений с опцией { verbose: true } которая выводит в консоль подробную информацию о процессе
    .pipe(app.gulp.dest(app.paths.img.docs));
};

// Задача gulp svg | Сборка SVG-иконок в один файл (спрайт) с удалением атрибутов fill|stroke и оборачиванием каждой иконки в тег <symbol> c генерацией id="svgName"
export const svgDocs = () => {
  return app.gulp
    .src(app.paths.svg.src) // Забираем сходные SVG-иконки
    .pipe(plumber(plumberNotify("SVG"))) // Обработка ошибок в SVG
    .pipe(svgsprite(svgSprite)) // Объединение всех SVG-иконки в один файл (спрайт)
    .pipe(app.gulp.dest(app.paths.svg.docs)); // Сохраняем итоговый спрайт
};

// Задача gulp js | Копирования скриптов
export const jsDocs = () => {
  return app.gulp
    .src(app.paths.js.src)
    .pipe(changed(app.paths.js.docs))
    .pipe(plumber(plumberNotify("JS")))
    .pipe(babel())
    .pipe(webpack(webpackConfig))
    .on("error", function(err) {
      console.error("WEBPACK ERROR", err);
      this.emit("end");
    })
    .pipe(app.gulp.dest(app.paths.js.docs));
};

export const filesDocs = (done) => {
  // Условие: Есть или нет папка /files
  if (fs.existsSync(app.paths.files.src)) {
    return app.gulp.pipe(changed(app.paths.files.docs)).pipe(app.gulp.dest(app.paths.files.docs));
  } else {
    done();
  }
};

// Задача gulp server | Запуск локального сервера с автообновлением страниц
export const serverDocs = () => {
  return app.gulp.src(app.paths.html.docs).pipe(server(serverOptions));
};
