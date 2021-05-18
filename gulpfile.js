const gulp = require('gulp')
const {parallel, series} = require('gulp')
const tap = require('gulp-tap')

const watch = require('gulp-watch')
const sass = require('gulp-sass')
const pug = require('gulp-pug')
const browserSync = require('browser-sync')
const imagemin = require('gulp-imagemin')
const svgSprite = require('gulp-svg-sprite')
const del = require('del');
const assetsURL = process.env.NODE_ENV === "production" ? '' : ''
const amoServiceURL = process.env.AMO_SERVICE_URL || "http://extralevel-amo-service.d-01.srvdev.ru/applications"

/* Complete SASS */
function styles() {
  return gulp.src('src/**/**/**/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/'))
    .pipe(browserSync.reload({stream: true}))
}

/* Pug(Jade) */
function pug2html() {
  return gulp.src('src/**/!(_)*.pug')
    .pipe(pug({
      pretty: true,
      data: {
        assetsUrl: assetsURL,
        amoServiceUrl: amoServiceURL
      }
    }))
    .pipe(gulp.dest('public'))
    .pipe(browserSync.reload({stream: true}))
}

/* JavaScript&jQuery */
function scripts() {
  return gulp.src('src/**/**/**/js/*.js')
    .pipe(gulp.dest('public/'))
    .pipe(browserSync.reload({stream: true}))
}

/* Images */
function imageMinify() {
  return gulp.src('src/**/**/**/*.{gif,png,jpg,svg,webp,ico}')
    .pipe(imagemin([
      //imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({
        quality: 75,
        progressive: true
      }),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest('public/'))
    .pipe(browserSync.reload({stream: true}))
}

/* SVG sprite */

const PROJECT_NAME_REGEXP = new RegExp('/src/([^/]+)/images/sprite/');

function getProjectName(path) {
  const [, projectName] = PROJECT_NAME_REGEXP.exec(path);

  return projectName;
}

function spriteSVG() {
  let projectName = ""
  return gulp.src('src/**/**/**/sprite/*.svg') // svg files for sprite
    .pipe(tap(function (file, t) {
      projectName = getProjectName(file.path)
    }))
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: `../sprite.svg` //sprite file name
        }
      }
    }))
    .pipe(gulp.dest(function (file) {
      return `public/${projectName}/images/`
    }))
    .pipe(browserSync.reload({stream: true}))
}

function fonts() {
  return gulp.src('src/**/**/**/fonts/**')
    .pipe(gulp.dest('public/'))
    .pipe(browserSync.reload({stream: true}))
}

function favicon() {
  return gulp.src('src/common/favicon/site.webmanifest')
    .pipe(gulp.dest('public/common/favicon/'))
    .pipe(browserSync.reload({stream: true}))
}

function documents() {
  return gulp.src('src/common/docs/*.{pdf,docx,xls}')
    .pipe(gulp.dest('public/'))
    .pipe(browserSync.reload({stream: true}))
}

/* Browser-sync */
function browser() {
  browserSync({
    server: {
      baseDir: 'public',
      routes: {
        '/unity': '/unity.html'
      }
    },
    notify: false
  })
}

function watching() {

//gulp.task('watch' , ['browserSync' , 'pug2html' , 'styles' , 'imageMinify' , 'svgSprite' , 'scripts'] , function(){
  watch('src/**/**/*.scss', styles);
  watch('src/**/**/*.pug', pug2html);
  watch('src/**/**/*.js', scripts);
  watch('src/**/**/*.{gif,png,jpg,svg,webp}', imageMinify);
  watch('src/**/**/sprite/*.svg', spriteSVG);
}

function clean() {
  return del(['public/**', '!public/extra-level.ico']);
}

exports.watch = parallel(watching, browser, pug2html, styles, imageMinify, spriteSVG, scripts, fonts, documents, favicon);

exports.build = series(clean,
  parallel(pug2html, styles, imageMinify, spriteSVG, scripts, fonts, documents, favicon)
);
