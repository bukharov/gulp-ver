'use strict';
var _ = require('lodash'), 
  path = require('path'),
  fs = require('fs'),
  gutil = require('gulp-util'),
  through = require('through2'),
  objectAssign = require('object-assign');

module.exports = function(opts) {
  var options = _.extend({
    file: 'package.json',
    fileKey: 'version',
    separator: '.'
  }, opts);
  
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-ver', 'Streaming not supported'));
      return;
    }

    file.revOrigPath = file.path;
    file.revOrigBase = file.base;
    
    var version;
    if(!options.version) {
      var filePath = options.filePath  ? path.resolve(options.filePath) : process.cwd();
      version = JSON.parse(fs.readFileSync(path.join(filePath, options.file)))[options.fileKey];
    }
    else {
      version = options.version;
    }
    
    version = _.isString(version) ? version.split('.') : version;
    
    if(_.isArray(options.prefix)) {
      version = options.prefix.concat(version);
    }

    if(_.isArray(options.suffix)) {
      version = version.concat(options.suffix);
    }
    
    version = (_.isString(options.prefix) ? options.prefix : '') + version.join(options.separator) + (_.isString(options.suffix) ? options.suffix : ''); 
    
    var ext = path.extname(file.path);
    file.path = path.join(path.dirname(file.path), path.basename(file.path, ext) + '-' + version + ext);
    cb(null, file);
  });
};
