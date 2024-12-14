// import gulp
import gulp from "gulp";
// import paths
import { paths } from "./gulp/paths.js";

// global object
global.app = {
  gulp,
  paths,
};

// import Dev
import { cleanDev, htmlDev, sassDev, imgDev, svgDev, jsDev, serverDev, watchDev } from "./gulp/dev.js";
// import Docs
import { cleanDocs, htmlDocs, sassDocs, imgDocs, svgDocs, jsDocs, serverDocs } from "./gulp/docs.js";
// fonts
import { fontsDev } from "./gulp/fontsDev.js";
import { fontsDocs } from "./gulp/fontsDocs.js";

// development tasks
export const dev = gulp.series(cleanDev, fontsDev, gulp.parallel(htmlDev, sassDev, imgDev, svgDev, jsDev), gulp.parallel(serverDev, watchDev));
// production tasks
export const docs = gulp.series(cleanDocs, fontsDocs, gulp.parallel(htmlDocs, sassDocs, imgDocs, svgDocs, jsDocs), serverDocs);

// default task (alias for 'dev')
export default dev;
