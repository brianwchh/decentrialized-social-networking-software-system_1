'use strict';

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("regenerator-runtime/runtime");

var _asyncToGenerator = require("/media/kimsong/u2/project/p2pChat/frontend/node_modules/@babel/runtime/helpers/asyncToGenerator");

var MySQL = require('mysql');

var Hoek = require('@hapi/hoek');

var redis = require('redis'); // 基本流程： 
// 1. 在register plugin時，初始化mysql
// 2. 在lifecycle中的onPreAuth中，把mysql的method加入到request的method中，所以在各個用戶的
// request在route的函數中就能通過調用這額這些方法訪問mysql數據庫。


var db = {
  pool: null
};
var redis_cache = {
  redis_client: null
};
redis_cache.init =
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  var port;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          port = 6379;
          _context.next = 3;
          return redis.createClient(port);

        case 3:
          redis_cache.redis_client = _context.sent;

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));

redis_cache.save =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(token, expireT, userID) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return redis_cache.redis_client.setex(token, expireT, userID);

          case 3:
            _context2.next = 8;
            break;

          case 5:
            _context2.prev = 5;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 5]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

redis_cache.delete =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(token) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return redis_cache.redis_client.del(token);

          case 3:
            _context3.next = 8;
            break;

          case 5:
            _context3.prev = 5;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 5]]);
  }));

  return function (_x4) {
    return _ref3.apply(this, arguments);
  };
}();

redis_cache.get =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(token) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", new Promise(function (resolve, reject) {
              return redis_cache.redis_client.get(token, function (err, data) {
                if (err) {
                  return reject(err);
                }

                return resolve(data);
              });
            }));

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x5) {
    return _ref4.apply(this, arguments);
  };
}();

db.attachConnection =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(request, h) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            // console.log(connection);
            request.app.db = db; // request.app.queryDb = db.query ;

            request.app.redis = redis_cache;
            return _context5.abrupt("return", h.continue);

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x6, _x7) {
    return _ref5.apply(this, arguments);
  };
}();

db.query =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(connection, queryOption) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", new Promise(function (resolve, reject) {
              return connection.query(queryOption, function (err, res, field) {
                if (err) {
                  return reject(err);
                }

                return resolve(res);
              });
            }));

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x8, _x9) {
    return _ref6.apply(this, arguments);
  };
}();
/**
 * original : pool.getConnection(function(err,connection){ 
 *  1. query operation on connection 
 *  2. release connection back to pool })
 * callback function = function(err,connection)
 */


db.getConnection =
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee7() {
  return regeneratorRuntime.wrap(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          return _context7.abrupt("return", new Promise(function (resolve, reject) {
            return db.pool.getConnection(function (err, connection) {
              if (err) {
                return reject(err);
              }

              return resolve(connection); // return a connection in resolve 
            });
          }));

        case 1:
        case "end":
          return _context7.stop();
      }
    }
  }, _callee7);
}));
exports.init = db.init =
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee8() {
  var baseOptions,
      hasOptions,
      _args8 = arguments;
  return regeneratorRuntime.wrap(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          baseOptions = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : {};
          hasOptions = Object.keys(baseOptions).length > 0;

          if (!(!db.pool && !hasOptions)) {
            _context8.next = 4;
            break;
          }

          throw new Error('No pool and no options to create one found, call `init` or `register` with options first');

        case 4:
          if (db.pool) {
            console.log("pool already exist, some logic must be wrong, not properly closed somewhere");
          } // for debuging purpose 


          if (Object.prototype.hasOwnProperty.call(baseOptions, 'host')) {
            _context8.next = 7;
            break;
          }

          throw new Error('Options must include host property');

        case 7:
          if (Object.prototype.hasOwnProperty.call(baseOptions, 'connectionLimit')) {
            _context8.next = 9;
            break;
          }

          throw new Error('Options must include connectionLimit property');

        case 9:
          if (Object.prototype.hasOwnProperty.call(baseOptions, 'user')) {
            _context8.next = 11;
            break;
          }

          throw new Error('Options must include user property');

        case 11:
          if (Object.prototype.hasOwnProperty.call(baseOptions, 'password')) {
            _context8.next = 13;
            break;
          }

          throw new Error('Options must include password property');

        case 13:
          if (Object.prototype.hasOwnProperty.call(baseOptions, 'database')) {
            _context8.next = 15;
            break;
          }

          throw new Error('Options must include database property');

        case 15:
          // create pool
          db.pool = MySQL.createPool(baseOptions);

        case 16:
        case "end":
          return _context8.stop();
      }
    }
  }, _callee8);
}));
exports.plugin = {
  name: 'mydb',
  version: '1.0.0',
  register: function () {
    var _register = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9(server, options) {
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return db.init(options);

            case 2:
              _context9.next = 4;
              return redis_cache.init();

            case 4:
              // redis, lazy way,need to create another plugin for it ???
              // attach mysql methods to request 
              server.ext('onPreAuth', db.attachConnection); // 注冊事件，在每個request來時調用回調函數

              console.log("mydb plugin registered");

            case 6:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));

    function register(_x10, _x11) {
      return _register.apply(this, arguments);
    }

    return register;
  }()
};