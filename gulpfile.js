const gulp = require('gulp')
const { parallel, series } = require('gulp')

const watch = require('gulp-watch')
const	sass = require('gulp-sass')
const	pug = require('gulp-pug')
const	browserSync = require('browser-sync')
const imagemin = require('gulp-imagemin')
const	svgSprite = require('gulp-svg-sprite')
const del = require('del');
const assetsURL = process.env.NODE_ENV === "production" ? '/' :''
const amoServiceURL = process.env.AMO_SERVICE_URL || "http://extralevel-amo-service.d-01.srvdev.ru/applications"

/* Complete SASS */
function styles() {
  return gulp.src('src/styles/*.scss')
    .pipe(sass().on('error' , sass.logError))
    .pipe(gulp.dest('public/gamedev/css/'))
    .pipe(browserSync.reload({stream: true}))
}

/* Pug(Jade) */
function pug2html() {
  return gulp.src('src/**/*.pug')
    .pipe(pug({
        pretty: true,
        data: {
            assetURL: assetsURL
        }
    }))
    .pipe(gulp.dest('public'))
    .pipe(browserSync.reload({stream: true}))
}

/* JavaScript&jQuery */
function scripts() {
  return gulp.src('src/js/*.js')
    .pipe(gulp.dest('public/gamedev/js'))
    .pipe(browserSync.reload({stream: true}))
}

/* Images */
function imageMinify() {
  return gulp.src('src/images/*.{gif,png,jpg,svg,webp,ico}')
    .pipe(imagemin([
      //imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({
        quality: 75,
        progressive: true
      }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(gulp.dest('public/gamedev/images'))
    .pipe(browserSync.reload({stream: true}))
}

/* SVG sprite */
function spriteSVG() {
  return gulp.src('src/images/sprite/*.svg') // svg files for sprite
    .pipe(svgSprite({
        mode: {
            stack: {
                sprite: "../sprite.svg"  //sprite file name
            }
        },
    }))
    .pipe(gulp.dest('public/gamedev/images'))
    .pipe(browserSync.reload({stream: true}))
}

function fonts() {
    return gulp.src('src/fonts/**')
        .pipe(gulp.dest('public/gamedev/fonts'))
        .pipe(browserSync.reload({stream: true}))
}

/* Browser-sync */
function browser() {
  browserSync({
    server: {
      baseDir: 'public'
    },
    notify: false
  })
}

function watching() {

//gulp.task('watch' , ['browserSync' , 'pug2html' , 'styles' , 'imageMinify' , 'svgSprite' , 'scripts'] , function(){
	watch('src/styles/*.scss' , styles);
	watch('src/*.pug' , pug2html);
	watch('src/js/*.js' , scripts);
	watch('src/images/*.{gif,png,jpg,svg,webp}' , imageMinify);
	watch('src/images/sprite/*.svg' , spriteSVG);
}

function clean() {
    return del(['public/**', '!public/extra-level.ico']);
}

exports.watch = parallel(watching , browser , pug2html , styles , imageMinify , spriteSVG , scripts , fonts);

exports.build = series(clean,
               parallel(pug2html , styles , imageMinify , spriteSVG , scripts, fonts)
             );
