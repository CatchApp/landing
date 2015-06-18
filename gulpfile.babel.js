import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import run from 'run-sequence';

const $ = gulpLoadPlugins();

gulp.task('build:js', () => {
    gulp
        .src([
            'src/vendor/jquery/dist/jquery.min.js',
            'src/vendor/bxslider-4/dist/jquery.bxslider.min.js',
            'src/js/*.js'
        ])
        .pipe($.sourcemaps.init())
        .pipe($.concat('app.js'))
        .pipe($.sourcemaps.write(
            './',
            {
                includeContent: true,
                sourceRoot: '../src/js'
            }
        ))
        .pipe(gulp.dest('dist/js'));
});
gulp.task('build:js:ie', () => {
    gulp
        .src([
            'src/vendor/html5shiv/dist/html5shiv.min.js',
            'src/vendor/html5shiv/dist/html5shiv-printshiv.min.js'
        ])
        .pipe($.sourcemaps.init())
        .pipe($.concat('ie.js'))
        .pipe($.sourcemaps.write(
            './',
            {
                includeContent: true,
                sourceRoot: '../src/js'
            }
        ))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('build:css', () => {
    gulp
        .src([
            'src/vendor/bootstrap/dist/css/bootstrap.css',
            'src/vendor/fontawesome/css/font-awesome.min.css',
            'src/vendor/bxslider-4/dist/jquery.bxslider.css',
            'src/css/fonts.css',
            'src/css/main.css',
            'src/css/media.css'
        ])
        .pipe($.sourcemaps.init())
        .pipe($.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe($.concat('style.css'))
        .pipe($.sourcemaps.write(
            './',
            {
                includeContent: false,
                sourceRoot: '../src/css'
            }
        ))
        .pipe(gulp.dest('dist/css'));
});
gulp.task('build:css:ie', () => {
    gulp
        .src(['src/css/ie8.css'])
        .pipe($.concat('ie.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('copy', [
    'copy:html',
    'copy:images',
    'copy:fonts'
]);

gulp.task('copy:html', () => {
    gulp
        .src([
            'src/*.html'
        ])
        .pipe($.htmlReplace({
            css: 'css/style.css',
            js: 'js/app.js',
            js_ie: {
                src: 'js/ie.js',
                tpl: '<!--[if IE 8]><script src="%s"></script><![endif]-->'
            },
            css_ie: {
                src: 'css/ie.css',
                tpl: '<!--[if lt IE 9]><link rel="stylesheet" href="%s" \/><![endif]-->'
            }
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('copy:images', () => {
    gulp
        .src([
            'src/images/**/*.*'
        ])
        .pipe(gulp.dest('dist/images'));
});

gulp.task('copy:fonts', () => {
    gulp
        .src([
            'src/fonts/**/*.*'
        ])
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('clean', done => {
    del([
        'dist'
    ], done);
});

gulp.task('build', done => {
    run(
        'clean',
        'copy',
        ['build:js', 'build:js:ie', 'build:css', 'build:css:ie'],
        done
    );
});