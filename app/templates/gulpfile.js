'use strict';

var gulp = require('gulp'),
  gp = require('gulp-load-plugins')(),
  wiredep = require('wiredep').stream,
  bs = require('browser-sync').create(),
  reload = bs.reload;

// lint js with jshint, combine all files into one,
// write a minified and unminified version of file
gulp.task('javascript', function(){
  return gulp.src('src/js/*.js')
    .pipe(gp.jshint())
    .pipe(gp.jshint.reporter('default'))
    .pipe(gp.concat('main.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(gp.rename({suffix: '.min'}))
    .pipe(gp.uglify())
    .pipe(gulp.dest('dist/js'));
});

// compile styles with libsass, autoprefix for browsers,
// write a minified and unminified version of file
gulp.task('sass', function () {
  gulp.src('src/scss/*.scss')
    .pipe(gp.sass({ errLogToConsole: true }))
    .pipe(gp.autoprefixer('last 2 version'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(gp.rename({suffix: '.min'}))
    .pipe(gp.csso())
    .pipe(gulp.dest('dist/assets/css'));
});

// optimize images with imagemin + cache those optimizations
gulp.task('images', function() {
  return gulp.src('src/assets/img/**/*')
    .pipe(gp.cache(gp.imagemin({
      optimizationLevel: 5, 
      progressive: true, 
      interlaced: true 
    })))
    .pipe(gulp.dest('dist/assets/img'));
});

// copy over html files
gulp.task('html', function(){
  return gulp.src('src/*.html')
    .pipe(wiredep({
      cwd: './dist',
      ignorePath: '../dist'
    }))
    .pipe(gulp.dest('dist'));
});

// copy over fonts
gulp.task('fonts', function(){
  return gulp.src('src/assets/fonts/*')
    .pipe(gulp.dest('dist/assets/fonts'));
});

// clean out dist, in case sources have been removed
gulp.task('clean', require('del').bind(null, ['dist/assets', 'dist/js']));

gulp.task('watch', function(){
  gulp.watch('src/js/*.js', ['javascript', reload]);
  gulp.watch('src/scss/*.scss', ['sass', reload]);
  gulp.watch('src/assets/fonts/*', ['fonts', reload]);
  gulp.watch('src/assets/img/**/*', ['images', reload]);
  gulp.watch('src/*.html', ['html', reload]);
});

// executing tasks from the dependency array is preferred
gulp.task('build', ['javascript', 'sass', 'images', 'fonts', 'html'], function(){
  return gulp.src('dist/**/*')
  .pipe(gp.size({ title: 'build', gzip: true }));
});

// start browsersync, start watch task to watch for changes
gulp.task('serve', ['build'], function(){
  bs.init({ server: './dist/' });
  gulp.start('watch');
});

// clean task should be synchronous
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});