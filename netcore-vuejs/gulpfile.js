/// <binding BeforeBuild='jsprod, sassprod' ProjectOpened='watch' />
'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const webpack = require('webpack-stream');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

const scriptsPath = 'Scripts/**/*.js';
const stylesPath = 'Styles/**/*.scss';

/**
 * CSS Processing
 * */
// Production Only
function sassprod() {
    // These are the plugins to be passed to PostCSS to do the autoprefixing
    // and minification
    const plugins = [
        autoprefixer(),
        cssnano
    ];
    return gulp.src(stylesPath)
        // First process thru sass loader
        .pipe(sass())
        // then process thru PostCSS
        .pipe(postcss(plugins))
        // rename the output file
        .pipe(rename('site.min.css'))
        // write output file to destination
        .pipe(gulp.dest('wwwroot/css'));
}
exports.sassprod = sassprod;

// Development only
function sassdev() {
    return gulp.src(stylesPath)
        // Handles errors and prevents from breaking the pipeline
        .pipe(plumber({
            errorHandler(err) {
                notify.onError({
                    title: `Gulp error in ${err.plugin}`,
                    message: err.toString()
                })(err);
            }
        }))
        .pipe(sass())
        .pipe(rename('site.css'))
        .pipe(gulp.dest('wwwroot/css'));
}
exports.sassdev = sassdev;

/**
 * JS Processing
 * */
// Production Only
function jsprod() {
    return gulp.src(scriptsPath)
        // First process thru Webpack
        // setting the mode to 'production'
        .pipe(webpack({
            mode: 'production'
        }))
        // then transpile to ES5
        .pipe(babel({
            presets: ['@babel/env']
        }))
        // then minify and uglify
        .pipe(uglify())
        // rename the output file
        .pipe(rename('site.min.js'))
        // write output file to destination
        .pipe(gulp.dest('wwwroot/js'));
}
exports.jsprod = jsprod;

// Development only
function jsdev() {
    return gulp.src(scriptsPath)
        // Handles errors and prevents from breaking the pipeline
        .pipe(plumber({
            errorHandler(err) {
                notify.onError({
                    title: `Gulp error in ${err.plugin}`,
                    message: err.toString()
                })(err);
            }
        }))
        .pipe(webpack({
            mode: 'development'
        }))
        .pipe(rename('site.js'))
        .pipe(gulp.dest('wwwroot/js'));
}
exports.jsdev = jsdev;

/**
 * Watch
 * */
// Everytime we save JS/Sass files, run the development tasks
// to process and perform conversions
function watch(done) {
    gulp.watch(stylesPath, gulp.series('sassdev'));
    gulp.watch(scriptsPath, gulp.series('jsdev'));
    done();
}
exports.watch = gulp.series(watch);
