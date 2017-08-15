const gulp = require('gulp');
const image = require('gulp-image');
const clean = require('gulp-clean');

const paths = {
    src: './queue/**/*',
    dst: './processed',
};
gulp.task('image', function () {
    gulp.src(paths.src)
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: true,
            jpegoptim: true,
            mozjpeg: true,
            guetzli: true,
            gifsicle: true,
            svgo: true,
            concurrent: 10
        }))
        .pipe(gulp.dest(paths.dst));
});

gulp.task('clean', function(){
    return gulp.src([paths.dst], {read: false})
        .pipe(clean({force: true}));
});

gulp.task('default', ['clean', 'image']);