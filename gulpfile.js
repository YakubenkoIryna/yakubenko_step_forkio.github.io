const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');

sass.compiler = require('node-sass');

gulp.task('t-sass', function () {
    return gulp.src('src/scss/*.scss')
        .pipe(autoprefixer({
            overrideBrowserslist:  ['last 4 versions'],
            cascade: false
        }))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({stream: true}));
});


gulp.task('compress', function() {
    return gulp.src('src/img/**/*')
        .pipe(imagemin().on('error', sass.logError))
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('style:vendor', function () {
    return gulp
        .src([
            './node_modules/@fortawesome/fontawesome-free/css/all.css',
            './node_modules/bootstrap/dist/css/bootstrap.css'
        ])
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({stream: true}));
});


gulp.task('minify', () => {
    return gulp.src('src/index.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('script:vendor', function () {
    return gulp
        .src([
            './node_modules/@fortawesome/fontawesome-free/js/all.js',

        ])
        .pipe(uglify())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('script:custom', function () {
    return gulp
        .src(
            './src/js/*.js',
        )
        .pipe(uglify())
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({stream: true}));
});
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });
});

gulp.task('build',
    gulp.series(
        't-sass',
        'style:vendor',
        'minify',
        'script:vendor',
        'script:custom',
        'compress',
        'browser-sync'
    )
);

gulp.task('watch', function () {
    return gulp
        .watch(
            'src/**/*.*',
            gulp.series(
                't-sass',
                'style:vendor',
                'minify',
                'script:vendor',
                'script:custom',
                'compress'
            )
        )
});