'use strict';

require("core-js/modules/es.array.slice");

require("regenerator-runtime/runtime");

var _asyncToGenerator = require("/media/kimsong/u2/project/p2pChat/frontend/node_modules/@babel/runtime/helpers/asyncToGenerator");

var Hapi = require('@hapi/hapi');

var ipport = require('./ipport');

var url = require('url');

var _require = require('./auth_validates/isCurrentOrSuper'),
    isCurrentOrSuper = _require.isCurrentOrSuper;

var _require2 = require('./auth_validates/isSuperUser'),
    isSuperUser = _require2.isSuperUser;

var init =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var server;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            server = Hapi.server({
              port: ipport.port,
              host: ipport.host,
              routes: {
                cors: {
                  origin: ['*'] // an array of origins or 'ignore'    
                  // credentials: true // boolean - 'Access-Control-Allow-Credentials'

                }
              }
            });
            _context2.prev = 1;
            _context2.next = 4;
            return server.register({
              plugin: require('./plugins/auth/token')
            });

          case 4:
            server.auth.strategy('isSuperUser', 'token', {
              validate: isSuperUser.validate
            });
            server.auth.strategy('isCurrentOrSuper', 'token', {
              validate: isCurrentOrSuper.validate
            });
            _context2.next = 8;
            return server.register({
              plugin: require('./plugins/chat')
            });

          case 8:
            _context2.next = 10;
            return server.register({
              plugin: require('./plugins/insert')
            });

          case 10:
            _context2.next = 12;
            return server.register({
              plugin: require('./plugins/mydb'),
              options: {
                connectionLimit: 5,
                host: 'localhost',
                user: 'root',
                password: '1983wchh',
                database: 'chatapp'
              }
            });

          case 12:
            _context2.next = 14;
            return server.register({
              plugin: require('./plugins/fileop')
            });

          case 14:
            _context2.next = 16;
            return server.register({
              plugin: require('hapi-router'),
              options: {
                routes: '**/**/**/Route.js'
              }
            });

          case 16:
            _context2.next = 18;
            return server.register({
              plugin: require('./plugins/staticFileServer')
            });

          case 18:
            server.ext('onRequest',
            /*#__PURE__*/
            function () {
              var _ref2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee(req, h) {
                var path, len;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        path = req.path;
                        len = path.length;

                        if (path[len - 1] === '/') {
                          req.path = path.slice(0, -1);
                        } // console.log(req.headers['content-type'])
                        // if ('application/csp-report' === req.headers['content-type']) {
                        //     req.headers['content-type'] = 'application/json';
                        //     req.headers['x-content-type'] = 'application/csp-report';
                        //   }


                        return _context.abrupt("return", h.continue);

                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x, _x2) {
                return _ref2.apply(this, arguments);
              };
            }());
            _context2.next = 24;
            break;

          case 21:
            _context2.prev = 21;
            _context2.t0 = _context2["catch"](1);
            throw _context2.t0;

          case 24:
            server.start();
            console.log('Server running on %s', server.info.uri);

          case 26:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 21]]);
  }));

  return function init() {
    return _ref.apply(this, arguments);
  };
}();

process.on('unhandledRejection', function (err) {
  console.log(err);
  process.exit(1);
});
init();