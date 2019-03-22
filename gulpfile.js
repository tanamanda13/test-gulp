


const { series, parallel, src, dest, watch } = require('gulp');
const html = require('gulp-pug');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const prod = process.env.NODE_ENV === 'prod';
const gulpif = require('gulp-if');
const autoprefixer = require('gulp-autoprefixer');
const pxtorem = require('gulp-pxtorem');
const browserSync = require('browser-sync');
const babel = require('gulp-babel');

const server = browserSync.create();

function html1() {
  return src('src/index.pug') // je prend un dossier // si *.html = ts fich html
  .pipe(html())
  .pipe(dest('dist')) // pipe = tuyau ==> je mets le fichier html dans dist
}

function css() {
  return src('src/scss/styles.scss')
  .pipe(sass()) //je transforme css en sass
  .pipe(gulpif(prod, cssnano()))
  .pipe(gulpif(prod, autoprefixer()))
  .pipe(pxtorem())
  .pipe(dest('dist/css'));
}

function js() {
  return src('src/js/scripts.js')
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(dest('dist/js'));
}



function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: './dist'
    }
  });
  done();
} 

exports.dev = series(parallel(html1, css, js), serve, function(){
  watch(['src/scss/**/*.scss'], series(parallel(html1, css, js), reload))
});
// exports.dev = series(parallel(html1, css), serve, () =>
//   watch(['src/scss/**/*.scss'], series(parallel(html1, css), reload))
// );
exports.build = parallel(html1, css, js);

