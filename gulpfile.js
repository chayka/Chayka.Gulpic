const gulp = require('gulp');
const image = require('gulp-image');
const clean = require('gulp-clean');
const argv = require('yargs').argv;

const paths = {
    src: './queue/**/*',
    dst: './processed',
};

gulp.task('image', function () {
    
    var files = argv['batch'].split(' ').filter(f => !!f);
    // console.log(files);
    gulp.src(files, { cwd : './queue/' })
        .pipe(image({
            // pngquant: true,
            // optipng: false,
            // zopflipng: true,
            // jpegRecompress: true,
            // jpegoptim: true,
            // mozjpeg: true,
            // guetzli: true,
            // gifsicle: true,
            // svgo: true,
            concurrent: 2
        }))
        .pipe(gulp.dest(paths.dst));
});

gulp.task('clean', function(){
    return gulp.src([paths.dst], {read: false})
        .pipe(clean({force: true}));
});

gulp.task('default', ['clean', 'image']);