'use strict';

require("regenerator-runtime/runtime");

var _asyncToGenerator = require("/media/kimsong/u2/project/p2pChat/frontend/node_modules/@babel/runtime/helpers/asyncToGenerator");

var isSuperUser = {};

isSuperUser.validate =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req) {
    var isValid, credentials, token, user_id, connection, res, errMsg, getUserQuery, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            isValid = false;
            credentials = null; // console.log(req.query)

            token = req.query.token;

            if (token) {
              _context.next = 6;
              break;
            }

            credentials = {
              err: 'no token found'
            };
            return _context.abrupt("return", {
              isValid: isValid,
              credentials: credentials
            });

          case 6:
            // check if token is valid 
            user_id = null;
            _context.prev = 7;
            _context.next = 10;
            return req.app.redis.get(token);

          case 10:
            user_id = _context.sent;
            _context.next = 18;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](7);
            console.log(_context.t0);
            credentials = {
              err: _context.t0
            };
            return _context.abrupt("return", {
              isValid: isValid,
              credentials: credentials
            });

          case 18:
            _context.prev = 18;
            _context.next = 21;
            return req.app.db.getConnection();

          case 21:
            connection = _context.sent;
            _context.next = 29;
            break;

          case 24:
            _context.prev = 24;
            _context.t1 = _context["catch"](18);
            console.log(_context.t1);
            credentials = {
              err: _context.t1
            };
            return _context.abrupt("return", {
              isValid: isValid,
              credentials: credentials
            });

          case 29:
            // create User table if not exist 
            getUserQuery = "SELECT id, name , isSuper\n                         FROM User\n                         WHERE id = '".concat(user_id, "'");
            _context.prev = 30;
            _context.next = 33;
            return req.app.db.query(connection, getUserQuery);

          case 33:
            res = _context.sent;
            res = res[0];
            _context.next = 44;
            break;

          case 37:
            _context.prev = 37;
            _context.t2 = _context["catch"](30);
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

          case 44:
            connection.release();
            user = res;

            if (!user) {
              isValid = false;
              credentials = {
                err: 'token invalid'
              };
            } else if (user.isSuper) {
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

          case 48:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[7, 13], [18, 24], [30, 37]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.isSuperUser = isSuperUser;