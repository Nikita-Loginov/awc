const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();

// Задача для включения HTML
gulp.task('html', function () {
    return gulp.src('html/pages/*.html')
        .pipe(fileInclude({
            prefix: '@@', 
            basepath: '@file'
        }))
        .pipe(gulp.dest('.')) 
        .pipe(browserSync.stream());
});

// Задача для отслеживания изменений
gulp.task('watch', function () {
    browserSync.init({
        server: './' 
    });

    gulp.watch('html/**/*.html', gulp.series('html'));
    gulp.watch('css/*.css').on('change', browserSync.reload);
    gulp.watch('html/modules/*.html').on('change', browserSync.reload); 
});

// Задача по умолчанию
gulp.task('default', gulp.series('html', 'watch'));