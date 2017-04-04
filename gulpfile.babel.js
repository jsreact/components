import browserSync from 'browser-sync';
import gulp from 'gulp';
import sass from 'gulp-sass';
import eslint from 'gulp-eslint';
import plumber from 'gulp-plumber';
import rollup from 'gulp-better-rollup';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

gulp.task('js', () => {
  gulp.src('./src/js/**/*.js')
    .pipe(plumber())
    .pipe(rollup({
      plugins: [
        resolve({
          jsnext: true,
          main: true
        }),
        commonjs({
          include: './src/js',
          extensions: ['.js']
        })
      ],
      format: 'umd',
      moduleName: 'Slick'
    }))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('eslint', function() {
  return gulp.src('./src/js/*.js')
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('sass', function() {
  return gulp.src('./src/scss/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.stream());
});

gulp.task('html', function() {
  return gulp.src('./src/*.html')
    .pipe(plumber())
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['html', 'eslint', 'js', 'sass'], function() {
  browserSync.init({
    server: ['./dist', './']
  });

  gulp.watch('./src/js/*.js', ['eslint', 'js']);
  gulp.watch('./src/scss/*.scss', ['sass']);
  gulp.watch('./src/*.html', ['html']);
});

gulp.task('default', ['serve']);

