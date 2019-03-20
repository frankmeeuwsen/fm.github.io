var gulp = require('gulp');
var shell = require('gulp-shell');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

// Task for building blog when something changed:
//gulp.task('build', shell.task(['bundle exec jekyll serve']));
// If you don't use bundle:
gulp.task('build', shell.task(['bundle exec jekyll serve --incremental']));

// Task for serving blog with Browsersync
gulp.task('serve', function () {
    browserSync.init({
      server:
        {baseDir: '_site/'}
      }
    );
    // Reloads page when some of the already built files changed:
    gulp.watch('_site/**/*.*').on('change', browserSync.reload);
});

//compile
gulp.task('sass', function () {
  gulp.src('styles/style.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('styles/'));
  });

//compile and watch
gulp.task('sass:watch', function() {
  gulp.watch('styles/style.scss', ['sass']);
 });

gulp.task('default', ['build', 'serve', 'sass:watch']);
