'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync');
const panini = require('panini');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-dart-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const webpackStream = require('webpack-stream');
const del = require('del');

const path = {
  src: {
    base: 'src/',
    layouts: 'src/layouts/',
    partials: 'src/partials/',
    helpers: 'src/helpers/',
    data: 'src/data/',
  },
  watch: {
    html: 'src/*.html',
    css: 'src/assets/scss/**/*.+(scss|sass|css)',
    js: 'src/assets/js/**/*.js',
    fonts: 'src/assets/fonts/**/*',
    images: 'src/assets/images/**/*',
  },
  dist: {
    base: 'dist/',
    css: 'dist/assets/css/',
    js: 'dist/assets/js/',
    fonts: 'dist/assets/fonts/',
    images: 'dist/assets/images/',
  },
};

gulp.task('server', function () {
  browserSync({
    server: {
      baseDir: path.dist.base,
    },
  });

  gulp.watch(path.watch.html).on('change', browserSync.reload);
});

gulp.task('html', function () {
  return gulp
    .src(path.watch.html)
    .pipe(
      panini({
        root: path.src.base,
        layouts: path.src.layouts,
        partials: path.src.partials,
        helpers: path.src.helpers,
        data: path.src.data,
      })
    )
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(path.dist.base));
});

gulp.task('htmlWatch', function () {
  return gulp
    .src(path.watch.html)
    .pipe(
      panini({
        root: path.src.base,
        layouts: path.src.layouts,
        partials: path.src.partials,
        helpers: path.src.helpers,
        data: path.src.data,
      })
    )
    .pipe(gulp.dest(path.dist.base));
});

gulp.task('css', function () {
  return gulp
    .src(path.watch.css)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename({ suffix: '.min', prefix: '' }))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest(path.dist.css))
    .pipe(browserSync.stream());
});

gulp.task('cssWatch', function () {
  return gulp
    .src(path.watch.css)
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({ suffix: '.min', prefix: '' }))
    .pipe(autoprefixer())
    .pipe(gulp.dest(path.dist.css))
    .pipe(browserSync.stream());
});

gulp.task('js', function () {
  return gulp
    .src(path.watch.js)
    .pipe(
      webpackStream({
        mode: 'production',
        output: {
          filename: 'app.js',
        },
      })
    )
    .pipe(gulp.dest(path.dist.js))
    .pipe(browserSync.stream());
});

gulp.task('jsWatch', function () {
  return gulp
    .src(path.watch.js)
    .pipe(
      webpackStream({
        mode: 'development',
        output: {
          filename: 'app.js',
        },
      })
    )
    .pipe(gulp.dest(path.dist.js))
    .pipe(browserSync.stream());
});

gulp.task('fonts', function () {
  return gulp
    .src(path.watch.fonts)
    .pipe(gulp.dest(path.dist.fonts))
    .pipe(browserSync.stream());
});

gulp.task('images', function () {
  return gulp
    .src(path.watch.images)
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 95, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(gulp.dest(path.dist.images))
    .pipe(browserSync.stream());
});

gulp.task('imgWatch', function () {
  return gulp
    .src(path.watch.images)
    .pipe(gulp.dest(path.dist.images))
    .pipe(browserSync.stream());
});

gulp.task('watch', function () {
  gulp.watch(path.watch.html).on('change', gulp.parallel('htmlWatch'));
  gulp.watch(path.watch.css, gulp.parallel('cssWatch'));
  gulp.watch(path.watch.js).on('all', gulp.parallel('jsWatch'));
  gulp.watch(path.watch.fonts).on('all', gulp.parallel('fonts'));
  gulp.watch(path.watch.images).on('all', gulp.parallel('imgWatch'));
});

function clean() {
  return del(path.dist.base);
}

gulp.task(
  'default',
  gulp.parallel(
    'watch',
    'server',
    'htmlWatch',
    'cssWatch',
    'jsWatch',
    'fonts',
    'imgWatch'
  )
);

gulp.task(
  'build',
  gulp.series(clean, gulp.parallel('html', 'css', 'js', 'images', 'fonts'))
);
