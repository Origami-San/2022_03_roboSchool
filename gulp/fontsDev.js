// import support Node.js
import gulp from "gulp";
import fs from "fs"; // Работа с проводником
import path from "path"; // Работа с путями файлов и директрриями
// import fonts
import fonter from "gulp-fonter-fix";
import ttf2woff2 from "gulp-ttf2woff2";
// import notify
import plumber from "gulp-plumber"; // Обработка ошибок без разрыва потока
import notify from "gulp-notify"; // Вывод оповещения об ошиюках

// Settings fonts
const srcFolder = "./src";
const destFolder = "./build";

// Конвертация .otf в .ttf
export const otfToTtf = () => {
  // Ищем файлы шрифтов .otf
  return (
    gulp
      .src(`${srcFolder}/fonts/*.otf`, { encoding: false })
      // Конвертируем в .ttf
      .pipe(
        fonter({
          formats: ["ttf"],
        })
      )
      // Выгружаем в исходную папку
      .pipe(gulp.dest(`${srcFolder}/fonts/`))
      .pipe(
        plumber(
          notify.onError({
            title: "FONTS",
            message: "Error: <%= error.message %>. File: <%= file.relative %>!",
          })
        )
      )
  );
};

// Конвертация .ttf в .woff и .woff2
export const ttfToWoff = () => {
  // Ищем файлы шрифтов .ttf
  return (
    gulp
      .src(`${srcFolder}/fonts/*.ttf`, { encoding: false })
      // Конвертируем в .woff
      .pipe(
        fonter({
          formats: ["woff"],
        })
      )
      // Выгружаем в папку с результатом
      .pipe(gulp.dest(`${destFolder}/fonts/`))
      // Ищем файлы шрифтов .ttf
      .pipe(gulp.src(`${srcFolder}/fonts/*.ttf`, { encoding: false }))
      // Конвертируем в .woff2
      .pipe(ttf2woff2())
      // Выгружаем в папку с результатом
      .pipe(gulp.dest(`${destFolder}/fonts/`))
      .pipe(
        plumber(
          notify.onError({
            title: "FONTS",
            message: "Error: <%= error.message %>",
          })
        )
      )
  );
};

// Генерация файла стилей для шрифтов
export const fontsStyle = () => {
  // Файл стилей подключения шрифтов
  let fontsFile = `${srcFolder}/scss/base/_fontsAutoGen.scss`;
  // Проверяем существуют ли файлы шрифтов
  fs.readdir(`${destFolder}/fonts/`, function(err, fontsFiles) {
    if (fontsFiles) {
      // Проверяем существует ли файл стилей для подключения шрифтов

      // Если файла нет, создаем его
      fs.writeFile(fontsFile, "", cb);
      let newFileOnly;
      for (var i = 0; i < fontsFiles.length; i++) {
        // Записываем подключения шрифтов в файл стилей
        let fontFileName = fontsFiles[i].split(".")[0];
        if (newFileOnly !== fontFileName) {
          let fontName = fontFileName.split("-")[0] ? fontFileName.split("-")[0] : fontFileName;
          let fontWeight = fontFileName.split("-")[1] ? fontFileName.split("-")[1] : fontFileName;
          let fontStyle = "normal";

          // Проверяем на наличие Italic
          if (fontFileName.toLowerCase().includes("italic")) {
            fontStyle = "italic";
          }
          // Сопоставление веса шрифта
          if (fontWeight.toLowerCase() === "thin") {
            fontWeight = 100;
          } else if (fontWeight.toLowerCase() === "extralight") {
            fontWeight = 200;
          } else if (fontWeight.toLowerCase() === "light") {
            fontWeight = 300;
          } else if (fontWeight.toLowerCase() === "medium") {
            fontWeight = 500;
          } else if (fontWeight.toLowerCase() === "semibold") {
            fontWeight = 600;
          } else if (fontWeight.toLowerCase() === "bold") {
            fontWeight = 700;
          } else if (fontWeight.toLowerCase() === "extrabold" || fontWeight.toLowerCase() === "heavy") {
            fontWeight = 800;
          } else if (fontWeight.toLowerCase() === "black") {
            fontWeight = 900;
          } else {
            fontWeight = 400;
          }

          fs.appendFile(
            fontsFile,
            `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: ${fontStyle};\n}\r\n`,
            cb
          );
          newFileOnly = fontFileName;
        }
      }
    }
  });

  return gulp.src(`${srcFolder}`);
  function cb() {}
};

// Генерация fonts preload в head для шрифтов .woff2
export const fontsPreload = (done) => {
  // Проверяем наличие шрифтов в папке ./build/fonts/
  fs.readdir(`${destFolder}/fonts/`, (err, files) => {
    if (err) {
      console.error("Ошибка чтения папки со шрифтами:", err);
      return;
    }

    // Фильтруем файлы, оставляем только .woff2
    const woff2Fonts = files.filter((file) => path.extname(file) === ".woff2");

    if (woff2Fonts.length === 0) {
      console.log("Нет шрифтов в формате .woff2 для генерации.");
      return;
    }

    // Проверяем, существует ли файл fontsAutoPreload.html, если нет — создаём его
    fs.writeFile(`${srcFolder}/html/blocks/fontsAutoPreload.html`, "", (err) => {
      if (err) {
        console.error("Ошибка создания файла fontsAutoPreload.html:", err);
        return;
      }

      // Генерируем теги <link> для каждого файла .woff2
      woff2Fonts.forEach((fontFile) => {
        const fontPath = `./fonts/${fontFile}`;
        const preloadLink = `<link rel="preload" href="${fontPath}" as="font" type="font/woff2" crossorigin />\n`;

        // Добавляем <link> в fontsAutoPreload.html
        fs.appendFile(`${srcFolder}/html/blocks/fontsAutoPreload.html`, preloadLink, (err) => {
          if (err) {
            console.error(`Ошибка записи в файл fontsAutoPreload.html для ${fontFile}:`, err);
          }
        });
      });

      console.log("Ссылки для шрифтов .woff2 успешно сгенерированы и добавлены в fontsAutoPreload.html.");
    });
  });
  done();
};

// Font tasks
export const fontsDev = gulp.series(otfToTtf, ttfToWoff, fontsStyle, fontsPreload);
