const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const spritesmith = require('gulp.spritesmith');
const rimraf = require('rimraf');
const soursemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

gulp.task('server', function() {
    browserSync.init({
        server: {
            port: 9000,
            baseDir: 'build'
        }
    });

    gulp.watch('build/**/*').on('change', browserSync.reload); 

});
/*--------Pug compile---------*/
gulp.task('template:compile', function BuildHTML() {
    return gulp.src('sours/template/index.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('build'))
})

/*--------Styles compile---------*/
gulp.task('styles:compile', function () {
    return gulp.src('sours/styles/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build/css'))
})

/*--------js---------*/
gulp.task('js', function() {
    return gulp.src(['sours/js/form.js', 'sours/js/main.js'])
        .pipe(soursemaps.init())
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(soursemaps.write())
        .pipe(gulp.dest('build/js'))
});

/*--------Sprite---------*/
gulp.task('sprite', function () {
  const spriteData = gulp.src('sours/images/**/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    imgPath: '../images/sprite.png',
    cssName: 'sprite.scss'
  }));

  spriteData.img.pipe(gulp.dest('build/images/'));
  spriteData.css.pipe(gulp.dest('sours/styles/global/'));
  
  return spriteData;
});

/*--------Delete---------*/
gulp.task('clean', function (cb) {
    rimraf('build', cb)
})

/*--------Copy fonts---------*/
gulp.task('copy:fonts', function () {
    return gulp.src('./sours/fonts/**/*')
        .pipe(gulp.dest('build/fonts'))
});

/*--------Copy images---------*/
gulp.task('copy:images', function () {
    return gulp.src('./sours/images/**/*')
        .pipe(gulp.dest('build/images'))
});

/*--------Copy ---------*/
gulp.task('copy', gulp.parallel('copy:fonts', 'copy:images'));

/*--------Warchers ---------*/
gulp.task('watch', function() {
    gulp.watch('sours/template/**/*.pug', gulp.series('template:compile'))
    gulp.watch('sours/styles/**/*.scss', gulp.series('styles:compile'))
    gulp.watch('sours/js/**/*.js', gulp.series('js'))
})

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('template:compile', 'styles:compile', 'js', 'sprite' ,'copy'),
    gulp.parallel('watch', 'server')
))