/// <binding BeforeBuild='js:prod, sass:prod' ProjectOpened='watch' />
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

const scriptsPath = 'Scripts/**/*.js';
const stylesPath = 'Styles/**/*.scss';

/**
 * CSS Processing
 * */
// Production Only
gulp.task('sass:prod', () => {
    // These are the plugins to be passed to PostCSS to do the autoprefixing
    // and minification
    const plugins = [
        autoprefixer({ browsers: ['>0.25%', 'not ie 11', 'not op_mini all'] }),
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
});

// Development only
gulp.task('sass:dev', () => {
    return gulp.src(stylesPath)
        .pipe(sass())
        .pipe(rename('site.css'))
        .pipe(gulp.dest('wwwroot/css'));
});

/**
 * JS Processing
 * */
// Production Only
gulp.task('js:prod', () => {
    gulp.src(scriptsPath)
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
        .pipe(gulp.dest('wwwroot/js'))
});

// Development only
gulp.task('js:dev', () => {
    gulp.src(scriptsPath)
        .pipe(webpack({
            mode: 'development'
        }))
        .pipe(rename('site.js'))
        .pipe(gulp.dest('wwwroot/js'))
});

/**
 * Watch
 * */
// Everytime we save JS/Sass files, run the development tasks
// to process and perform conversions
gulp.task('watch', () => {
    gulp.watch(stylesPath, ['sass:dev']);
    gulp.watch(scriptsPath, ['js:dev']);
});
