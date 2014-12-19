> Appends package version (package.json) to static files: style.css => style-2.0.2.css

This plugin is a [gulp-rev](https://github.com/sindresorhus/gulp-rev) ripoff that appends file version instead of a hash. 

## Install

```sh
$ npm install --save-dev gulp-ver
```


## Usage

```js
var gulp = require('gulp');
var ver = require('gulp-ver');

gulp.task('default', function () {
  return gulp.src('src/*.css')
    .pipe(ver())
    .pipe(gulp.dest('dist'));
});
```

### Options

#### options.file
Type: `String`

Default: `package.json`


File name to get the version from, the file must be in JSON format.


#### options.fileKey
Type: `String`

Default: `version`


Key name to use to retrieve the version from the file specified in `options.file`.


#### options.filePath
Type: `String`

Default: `process.cwd()`


The path where to look for the file specified in `options.file`.


#### options.version
Type: `String` or `Array`

Default: `undefined`


The version to append to assets. If this options is specified, all file related options (`options.file`, `options.fileKey`, `options.filePath`) are ignored.

Can be specified as string: `1.3.2` or as an array: `['1', '3', '2']`


#### options.separator
Type: `String`

Default: `.`


The separator to use when appending version to the file name. For example setting it to an empty string (`''`) with the version being `1.3.2` will output `file-132.js`.


#### options.prefix
Type: `String` or `Array`

Default: `undefined`


The prefix to prepend to the version, when specified as a string it gets prepended without a separator, for example `options.prefix = 'v'` will produce `file-v1.3.2.js`. 

When specified as an array it uses `options.separator` to join the array, ie `options.prefix = ['v']` will output `file-v.1.3.2.js`.


#### options.suffix
Type: `String` or `Array`

Default: `undefined`


The suffix to append to the version, it works pretty much as `options.prefix` does: `options.suffix = 'alpha'` will produce `file-1.3.2alpha.js`. 

When specified as an array (say you want to add a build number): `options.prefix = ['3422', 'min']` will output `file-1.3.2.3422.min.js`.


### Original path

Original file paths are stored at `file.revOrigPath`. This is done to be compatible with everything that works with `gulp-rev`.

### Streaming

This plugin does not support streaming. If you have files from a streaming source, such as browserify, you should use [gulp-buffer](https://github.com/jeromew/gulp-buffer) before `gulp-ver` in your pipeline:

```js
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('gulp-buffer');
var ver = require('gulp-ver');

gulp.task('default', function () {
  return browserify('src/index.js')
    .bundle({debug: true})
    .pipe(source('index.min.js'))
    .pipe(buffer())
    .pipe(ver())
    .pipe(gulp.dest('dist'))
});
```


### Works with gulp-ver

- [gulp-rev-replace](https://github.com/jamesknelson/gulp-rev-replace)
- [gulp-rev-css-url](https://github.com/galkinrost/gulp-rev-css-url)
- [gulp-rev-outdated](https://github.com/shonny-ua/gulp-rev-outdated)
- [gulp-rev-collector](https://github.com/shonny-ua/gulp-rev-collector)


## License

MIT © [Denis Bukharov](http://bukharov.com)
