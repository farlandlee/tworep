const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

exports.default = () => (
    gulp.src('src/images-raw/*.jpg')
        .pipe(imagemin(
            [
                imagemin.mozjpeg({quality: 75, progressive: true})
            ],
            {
                verbose: true
            })
        )
        .pipe(gulp.dest('src/images'))
);