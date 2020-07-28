const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');


gulp.task('sass', function () {
return gulp.src('src/scss/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('src/css/'))
});

gulp.task('watch', function () {
  gulp.watch('src/scss/**/*.scss', gulp.series('sass'))
});