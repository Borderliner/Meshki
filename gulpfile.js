/*
 * Meshki v2.0.0 (https://borderliner.github.io/Meshki/)
 * Copyright 2017 Mohammadreza Hajianpour <hajianpour.mr@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var fs = require('fs');
var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');
var srcmaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var delDir = function(path) {
  if(fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file, index) => {
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) {
        delDir(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

gulp.task('pre-compile', () => {
  if(!fs.existsSync('dist/')) {
    gutil.log(gutil.colors.yellow('No "dist" folder exists. Creating folders...'));
    fs.mkdirSync('dist/');
    fs.mkdirSync('dist/plugins/');
    fs.mkdirSync('dist/fonts/');
  } else {
    gutil.log(gutil.colors.yellow('Cleaning previously compiled files...'));
    delDir('dist/');
  }
});

gulp.task('compile', ['pre-compile']);

gulp.task('js-uglify', ['compile'], () => {
  return gulp.src('src/js/meshki.js')
    .pipe(rename((path) => {
      path.basename = 'meshki.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
});

gulp.task('js-copy', ['compile'], () => {
  return gulp.src('src/js/meshki.js')
    .pipe(gulp.dest('dist/'));
});

gulp.task('less-base', ['compile'], () => {
  return gulp.src('src/less/boot.less')
    .pipe(rename((path) => {
      path.basename = 'meshki';
    }))
    .pipe(less())
    .pipe(gulp.dest('dist/'));
});

gulp.task('less-plugins', ['compile'], () => {
  return gulp.src('src/less/plugins/*.less')
    .pipe(rename((path) => {
      path.basename = 'meshki-' + path.basename;
    }))
    .pipe(less())
    .pipe(gulp.dest('dist/plugins/'));
});

gulp.task('min-base', ['less-base'], () => {
  return gulp.src('dist/meshki.css')
    .pipe(rename((path) => {
      path.basename = 'meshki.min'
    }))
    .pipe(srcmaps.init())
    .pipe(cleanCSS({debug: false}))
    .pipe(srcmaps.write('.'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('min-plugins', ['less-plugins'], () => {
  return gulp.src('dist/plugins/*.css')
    .pipe(rename((path) => {
      path.basename += '.min';
    }))
    .pipe(srcmaps.init())
    .pipe(cleanCSS({debug: false}))
    .pipe(srcmaps.write('.'))
    .pipe(gulp.dest('dist/plugins/'));
});

gulp.task('post-compile', ['min-base', 'min-plugins', 'js-copy', 'js-uglify']);

gulp.task('fonts', ['compile'], () => {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('default', ['post-compile', 'fonts']);

gulp.task('watch', () => {
  gutil.log(gutil.colors.green('Watching "src/" directory for changes...'));
  gulp.watch('src/**/*', ['default']);
});
