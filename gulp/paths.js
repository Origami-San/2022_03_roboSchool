// Основные папки для сборки
const srcFolder = "./src";
const buildFolder = "./build";
const docsFolder = "./docs";

// Структура проекта
export const paths = {
  base: {
    src: srcFolder,
    build: buildFolder,
    docs: docsFolder,
  },
  html: {
    src: [`${srcFolder}/html/**/*.html`, `!./**/blocks/**/*.*`, `!${srcFolder}/html/docs/**/*.*`],
    srcWatch: [`${srcFolder}/html/**/*.html`, `${srcFolder}/html/**/*.json`],
    dest: `${buildFolder}/`,
    docs: `${docsFolder}/`,
  },
  styles: {
    src: [`${srcFolder}/scss/*.scss`, `${srcFolder}/scss/*.sass`],
    srcWatch: `${srcFolder}/scss/**/*.scss`,
    dest: `${buildFolder}/css/`,
    docs: `${docsFolder}/css/`,
  },
  js: {
    src: `${srcFolder}/js/*.js`,
    srcWatch: `${srcFolder}/js/**/*.js`,
    dest: `${buildFolder}/js/`,
    docs: `${docsFolder}/js/`,
  },
  img: {
    src: [`${srcFolder}/img/**/*`, `!${srcFolder}/img/svgicons/**`],
    srcFull: [`${srcFolder}/img/**/*`, `!${srcFolder}/img/svgicons/**`, `!${srcFolder}/img/favicons/**`],
    srcWatch: `${srcFolder}/img/**/*`,
    dest: `${buildFolder}/img/`,
    docs: `${docsFolder}/img/`,
  },
  svg: {
    src: `${srcFolder}/img/svgicons/**/*.svg`,
    srcWatch: `${srcFolder}/img/svgicons/*`,
    dest: `${buildFolder}/img/svgsprite/`,
    docs: `${docsFolder}/img/svgsprite/`,
  },
  fonts: {
    src: `${srcFolder}/`,
    dest: `${buildFolder}/`,
    docs: `${docsFolder}/`,
  },
  files: {
    src: `${srcFolder}/files/**/*`,
    dest: `${buildFolder}/files/`,
    docs: `${docsFolder}/files/`,
  },
};
