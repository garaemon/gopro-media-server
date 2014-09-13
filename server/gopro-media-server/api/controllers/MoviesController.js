/**
 * MoviesController
 *
 * @description :: Server-side logic for managing movies
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var path = require('path');
var fs = require('fs');
var colors = require('colors');
var walk = require('walk');

module.exports = {
  index: function(req, res, next) {
    var id = req.params.id;
    console.log('hello world' + id);
    res.send(200);              // OK!
  },
  scan: function(req, res, next) {
    // directory name should be
    //   ${prefix_dir}/${YYYY}/${MM}/${DD}/${HH}/${mm}/${SS}
    var YYYY = req.params.YYYY;
    var MM = req.params.MM;
    var DD = req.params.DD;
    var HH = req.params.HH;
    var mm = req.params.mm;
    var SS = req.params.SS;
    var directory_suffix
      = YYYY + '-' + MM + '-' + DD + '-' + HH + '-' + mm + '-' + SS;
    var full_dir_path = path.join(sails.config.server.movie_dir,
                                  YYYY, MM, DD, HH, mm, SS);
    // check the directory exists or not
    if (!fs.existsSync(full_dir_path)) { // the directory does not exist
      console.log(('[/MovieController/scan] directory does not exist: '
                   + full_dir_path).red);
      res.send(500);
    }
    else {
      // walk through all the files
      var walker  = walk.walk(full_dir_path, { followLinks: false });
      walker.on('file', function(root, stat, next) {
        var file_name = stat.name;
        var suffix = path.extname(file_name);
        // // check the file has .mp4 or .MP4 suffix
        if (suffix == '.mp4' || suffix == '.MP4') {
          // stat.atime -- access time
          // stat.mtime -- modify time
          // stat.ctime -- change time
          var full_movie_path = path.join(root, stat.name);
          // check the path is already stored in DB or not
          Movie.find({
            movie_path: full_movie_path
          }, function(err, movie) {
            if (!movie) {
              Movie.create({
                name: file_name,
                movie_path: full_movie_path
              }).exec(function(err, user) {
                //console.log('done: ' + full_movie_path);
              });
            }
          });
        }
        else {
          //console.log('not movie: ' + file_name);
        }


        next();
      });
      walker.on('end', function() {
        console.log('over');
        res.send(200);
      });
    }

  }
};
