'use strict';

require("core-js/modules/es.number.constructor");

require("regenerator-runtime/runtime");

var _asyncToGenerator = require("/media/kimsong/u2/project/p2pChat/frontend/node_modules/@babel/runtime/helpers/asyncToGenerator");

var isCurrentOrSuper = {};

isCurrentOrSuper.validate =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req) {
    var isValid, credentials, token, queriedUserID, user_id, connection, res, errMsg, getUserQuery, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            isValid = false;
            credentials = null;
            token = req.headers.token;
            queriedUserID = Number(req.params.id);

            if (token) {
              _context.next = 7;
              break;
            }

            credentials = {
              err: 'no token found'
            };
            return _context.abrupt("return", {
              isValid: isValid,
              credentials: credentials
            });

          case 7:
            // check if token is valid 
            user_id = null;
            _context.prev = 8;
            _context.next = 11;
            return req.app.redis.get(token);

          case 11:
            user_id = _context.sent;
            _context.next = 19;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](8);
            console.log(_context.t0);
            credentials = {
              err: _context.t0
            };
            return _context.abrupt("return", {
              isValid: isValid,
              credentials: credentials
            });

          case 19:
            console.log(user_id); // check if user is in the database 

            _context.prev = 20;
            _context.next = 23;
            return req.app.db.getConnection();

          case 23:
            connection = _context.sent;
            _context.next = 31;
            break;

          case 26:
            _context.prev = 26;
            _context.t1 = _context["catch"](20);
            console.log(_context.t1);
            credentials = {
              err: _context.t1
            };
            return _context.abrupt("return", {
              isValid: isValid,
              credentials: credentials
            });

          case 31:
            // create User table if not exist 
            getUserQuery = "SELECT id, name , isSuper\n                         FROM User\n                         WHERE id = '".concat(user_id, "'");
            _context.prev = 32;
            _context.next = 35;
            return req.app.db.query(connection, getUserQuery);

          case 35:
            res = _context.sent;
            res = res[0];
            _context.next = 46;
            break;

          case 39:
            _context.prev = 39;
            _context.t2 = _context["catch"](32);
            console.log(_context.t2.sqlMessage);
            errMsg = _context.t2.sqlMessage;
            connection.release();
            credentials = {
              err: _context.t2
            };
            return _context.abrupt("return", {
              isValid: isValid,
              credentials: credentials
            });

          case 46:
            connection.release();
            user = res;

            if (user.id === queriedUserID || user.isSuper) {
              isValid = true;
              credentials = user;
            } else {
              credentials = {
                err: 'token invalid'
              };
            }

            return _context.abrupt("return", {
              isValid: isValid,
              credentials: credentials
            });

          case 50:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[8, 14], [20, 26], [32, 39]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.isCurrentOrSuper = isCurrentOrSuper;