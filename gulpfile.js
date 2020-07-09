const { src, dest, watch, series, task } = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sass = require('gulp-sass');
const { postcssRTLCSS } = require('postcss-rtlcss');
const rename = require('gulp-rename');
const rtl_support = require('postcss-rtl-support');
const cleanCss = require('gulp-clean-css');
var processors = [
    autoprefixer,
];

function css(cb){
    cb();
    return src('./src/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([rtl_support, postcssRTLCSS]))
        .pipe(cleanCss({format: 'beautify', level: { 2: { restructureRules: true } } }))
        .pipe(postcss(processors))
        .pipe(dest('./dest'))
        .pipe(postcss([cssnano]))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(dest('./dest'));
}

task('watch', function () {
    return watch(['./src/**/*.scss'], css);
});

exports.default = css;