'use strict';

var fs = require('fs');

var _require = require('../../../config'),
    STATIC_ROOT = _require.STATIC_ROOT;

var fop = {};

fop["delete"] = function _callee(file) {
  var isExisted, res;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          isExisted = false;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(fop.isFileExisted(file));

        case 4:
          res = _context.sent;
          isExisted = res.isExisted;
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          isExisted = _context.t0.isExisted;

        case 11:
          if (!(isExisted === false)) {
            _context.next = 13;
            break;
          }

          return _context.abrupt("return", {
            err: 'file not exist',
            isDeleted: true
          });

        case 13:
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            return fs.unlink(file, function (err) {
              if (err) {
                reject({
                  err: err,
                  isDeleted: false
                });
              }

              resolve({
                msg: "".concat(file, " deleted"),
                isDeleted: true
              });
            });
          }));

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

fop.isPathExisted = function _callee2(path) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", new Promise(function (resolve, reject) {
            return fs.stat(path, function (err, stats) {
              // fs.stat(path[, options], callback)
              if (err) {
                return reject(err);
              }

              return resolve(stats);
            });
          }));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

fop.isFileExisted = function _callee3(file) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", new Promise(function (resolve, reject) {
            // const file = `${path}/${filename}` ;
            return fs.access(file, fs.constants.F_OK, function (err) {
              // fs.access(filename, mode, callback(err))
              // mode: fs.constants.F_OK , check if file exist 
              //       fs.constants.R_OK , check if file read ok
              //       fs.constants.W_OK , check if file write ok
              if (err) {
                return reject({
                  err: err,
                  isExisted: false
                });
              }

              return resolve({
                msg: "".concat(file, " exist"),
                isExisted: true
              });
            });
          }));

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

fop.createPathRecursively = function _callee4(path) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.abrupt("return", new Promise(function (resolve, reject) {
            return fs.mkdir(path, {
              recursive: true
            }, function (err) {
              if (err) {
                return reject(err);
              }

              return resolve(true);
            });
          }));

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
};

fop.upload_promise = function _callee5(path, filename, payload_file) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          return _context5.abrupt("return", new Promise(function (resolve, reject) {
            return fs.writeFile("".concat(path, "/").concat(filename), payload_file, function (err) {
              if (err) {
                reject(err);
              }

              resolve({
                msg: 'uploaded successfully'
              });
            });
          }));

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
};

fop.upload = function _callee6(path, filename, name_suffix, payload_file) {
  var pathExist, err, createPath, isExisted, filename_split, len, first_part, last_part, file, res, r, _filename_split, _len, _first_part, _last_part, _file, _res;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(fop.isPathExisted(path));

        case 3:
          pathStats = _context6.sent;
          pathExist = pathStats.isDirectory();
          _context6.next = 11;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          console.log("".concat(path, " not exist, need create one"));
          pathExist = false;

        case 11:
          if (!(pathExist === false)) {
            _context6.next = 23;
            break;
          }

          _context6.prev = 12;
          console.log("creating path : ".concat(path));
          _context6.next = 16;
          return regeneratorRuntime.awrap(fop.createPathRecursively(path));

        case 16:
          createPath = _context6.sent;
          _context6.next = 23;
          break;

        case 19:
          _context6.prev = 19;
          _context6.t1 = _context6["catch"](12);
          console.log(_context6.t1);
          throw _context6.t1;

        case 23:
          // 2. upload file,and save as filename, if exist, append random letters infront of the filename
          isExisted = false;
          _context6.prev = 24;
          filename_split = filename.split('.');
          len = filename_split.length;
          first_part = filename_split.slice(0, -1);
          last_part = filename_split.splice(-1, len);
          filename = first_part + '_' + name_suffix + '.' + last_part;
          file = "".concat(path, "/").concat(filename);
          _context6.next = 33;
          return regeneratorRuntime.awrap(fop.isFileExisted(file));

        case 33:
          res = _context6.sent;
          isExisted = res.isExisted;
          _context6.next = 40;
          break;

        case 37:
          _context6.prev = 37;
          _context6.t2 = _context6["catch"](24);
          // console.log(err);
          isExisted = _context6.t2.isExisted;

        case 40:
          if (isExisted === true) {
            // append random letters 
            r = Math.random().toString(36).substring(7);
            _filename_split = filename.split('.');
            _len = _filename_split.length;
            _first_part = _filename_split.slice(0, -1);
            _last_part = _filename_split.splice(-1, _len);
            filename = _first_part + '_' + name_suffix + '_' + r + '.' + _last_part;
          }

          _context6.prev = 41;
          _context6.next = 44;
          return regeneratorRuntime.awrap(fop.upload_promise(path, filename, payload_file));

        case 44:
          _context6.next = 49;
          break;

        case 46:
          _context6.prev = 46;
          _context6.t3 = _context6["catch"](41);
          console.log(_context6.t3);

        case 49:
          _context6.prev = 49;
          _file = "".concat(path, "/").concat(filename);
          console.log('file: ', _file);
          _context6.next = 54;
          return regeneratorRuntime.awrap(fop.isFileExisted(_file));

        case 54:
          _res = _context6.sent;
          isExisted = _res.isExisted;
          console.log(_res);
          _context6.next = 63;
          break;

        case 59:
          _context6.prev = 59;
          _context6.t4 = _context6["catch"](49);
          console.log(_context6.t4);
          isExisted = _context6.t4.isExisted;

        case 63:
          if (!(isExisted === true)) {
            _context6.next = 68;
            break;
          }

          console.log('upload succeed');
          return _context6.abrupt("return", {
            msg: 'upload succeed',
            path_file: "".concat(path, "/").concat(filename),
            isSuccessful: true
          });

        case 68:
          console.log(err);
          return _context6.abrupt("return", {
            isSuccessful: false,
            err: 'file upload not successful'
          });

        case 70:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7], [12, 19], [24, 37], [41, 46], [49, 59]]);
};

fop.attachConnection = function _callee7(request, h) {
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          request.app.fop = fop;
          return _context7.abrupt("return", h["continue"]);

        case 2:
        case "end":
          return _context7.stop();
      }
    }
  });
};

exports.plugin = {
  name: 'fop',
  version: '1.0.0',
  register: function register(server, options) {
    return regeneratorRuntime.async(function register$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            // attach mysql methods to request 
            server.ext('onPreAuth', fop.attachConnection); // 注冊事件，在每個request來時調用回調函數

            console.log("fop(file operation) plugin registered");

          case 2:
          case "end":
            return _context8.stop();
        }
      }
    });
  }
};