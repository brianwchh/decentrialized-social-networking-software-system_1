'use strict';

require("regenerator-runtime/runtime");

var _asyncToGenerator = require("/media/kimsong/u2/project/p2pChat/frontend/node_modules/@babel/runtime/helpers/asyncToGenerator");

var bcrypt = require('bcrypt');

var Joi = require('@hapi/joi');

var _require = require('../../../config'),
    rootname = _require.rootname;

var _require2 = require('../Model/User'),
    User = _require2.User;

var _require3 = require('uuid'),
    uuid4 = _require3.v4;

var UserView = {};

UserView.createsuperuser =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, h) {
    var schema, username, email, password, isSuper, connection, res, errMsg, hashPW, insertRoot;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            schema = Joi.object({
              username: Joi.string().alphanum().min(3).max(64).required(),
              password: Joi.string().required(),
              // .pattern(new RegExp('^[a-zA-Z0-9]')),
              repeat_password: Joi.ref('password'),
              email: Joi.string().min(3).max(64).required()
            }).with('password', 'repeat_password');
            _context.prev = 1;
            _context.next = 4;
            return schema.validateAsync({
              username: req.headers.username,
              password: req.headers.password,
              repeat_password: req.headers.repeat_password,
              email: req.headers.email
            });

          case 4:
            _context.next = 10;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](1);
            console.log(_context.t0);
            return _context.abrupt("return", {
              msg: _context.t0.details
            });

          case 10:
            if (!(req.headers.username !== rootname)) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", {
              msg: 'user name not allowed !'
            });

          case 12:
            username = req.headers.username;
            email = req.headers.email;
            password = req.headers.password;
            isSuper = true; // connect to mysql 

            _context.next = 18;
            return req.app.db.getConnection();

          case 18:
            connection = _context.sent;
            _context.prev = 19;
            _context.next = 22;
            return req.app.db.query(connection, User.createUserTable);

          case 22:
            res = _context.sent;
            _context.next = 29;
            break;

          case 25:
            _context.prev = 25;
            _context.t1 = _context["catch"](19);
            console.log(_context.t1.sqlMessage);
            errMsg = _context.t1.sqlMessage;

          case 29:
            _context.prev = 29;
            _context.next = 32;
            return bcrypt.hash(password, 10);

          case 32:
            hashPW = _context.sent;
            _context.next = 39;
            break;

          case 35:
            _context.prev = 35;
            _context.t2 = _context["catch"](29);
            console.log(_context.t2);
            return _context.abrupt("return", {
              err: _context.t2
            });

          case 39:
            insertRoot = User.insertSuper2Table(username, hashPW, email);
            _context.prev = 40;
            _context.next = 43;
            return req.app.db.query(connection, insertRoot);

          case 43:
            res = _context.sent;
            _context.next = 50;
            break;

          case 46:
            _context.prev = 46;
            _context.t3 = _context["catch"](40);
            console.log(_context.t3.sqlMessage);
            errMsg = _context.t3.sqlMessage;

          case 50:
            // release the coonnection back to pool 
            connection.release();
            return _context.abrupt("return", {
              res: res,
              err: errMsg
            });

          case 52:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 6], [19, 25], [29, 35], [40, 46]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

UserView.register =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, h) {
    var payload, schema, username, password, email, connection, hashPW, res, errMsg;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            payload = req.payload; // console.log(payload)

            schema = Joi.object({
              username: Joi.string().alphanum().min(3).max(30).required(),
              password: Joi.string(),
              // .pattern(new RegExp('^[a-zA-Z0-9]')),
              repeat_password: Joi.ref('password'),
              email: Joi.string()
            }).with('password', 'repeat_password');
            _context2.prev = 2;
            _context2.next = 5;
            return schema.validateAsync({
              username: payload.username,
              password: payload.password,
              repeat_password: payload.repeat_password,
              email: payload.email
            });

          case 5:
            _context2.next = 11;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](2);
            console.log(_context2.t0);
            return _context2.abrupt("return", {
              err: _context2.t0.details
            });

          case 11:
            username = payload.username;
            password = payload.password;
            email = payload.email;
            _context2.prev = 14;
            _context2.next = 17;
            return req.app.db.getConnection();

          case 17:
            connection = _context2.sent;
            _context2.next = 24;
            break;

          case 20:
            _context2.prev = 20;
            _context2.t1 = _context2["catch"](14);
            console.log(_context2.t1);
            return _context2.abrupt("return", {
              err: _context2.t1
            });

          case 24:
            _context2.prev = 24;
            _context2.next = 27;
            return bcrypt.hash(password, 10);

          case 27:
            hashPW = _context2.sent;
            _context2.next = 34;
            break;

          case 30:
            _context2.prev = 30;
            _context2.t2 = _context2["catch"](24);
            console.log(_context2.t2);
            return _context2.abrupt("return", {
              err: _context2.t2
            });

          case 34:
            _context2.prev = 34;
            _context2.next = 37;
            return req.app.db.query(connection, User.insertUser2Table(username, hashPW, email));

          case 37:
            res = _context2.sent;
            _context2.next = 44;
            break;

          case 40:
            _context2.prev = 40;
            _context2.t3 = _context2["catch"](34);
            console.log(_context2.t3.sqlMessage);
            errMsg = _context2.t3.sqlMessage;

          case 44:
            connection.release();
            return _context2.abrupt("return", {
              res: res,
              err: errMsg
            });

          case 46:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 7], [14, 20], [24, 30], [34, 40]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

UserView.login =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, h) {
    var schema, _req$payload, username, password, connection, hashPW, errMsg, isValid, userID, token;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            schema = Joi.object({
              username: Joi.string().alphanum().min(3).max(30).required(),
              password: Joi.string() // .pattern(new RegExp('^[a-zA-Z0-9]')),

            });
            _context3.prev = 1;
            _context3.next = 4;
            return schema.validateAsync({
              username: req.payload.username,
              password: req.payload.password
            });

          case 4:
            _context3.next = 10;
            break;

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](1);
            console.log(_context3.t0);
            return _context3.abrupt("return", {
              msg: _context3.t0.details
            });

          case 10:
            _req$payload = req.payload, username = _req$payload.username, password = _req$payload.password;
            _context3.prev = 11;
            _context3.next = 14;
            return req.app.db.getConnection();

          case 14:
            connection = _context3.sent;
            _context3.next = 21;
            break;

          case 17:
            _context3.prev = 17;
            _context3.t1 = _context3["catch"](11);
            console.log(_context3.t1);
            return _context3.abrupt("return", {
              err: _context3.t1
            });

          case 21:
            _context3.prev = 21;
            _context3.next = 24;
            return req.app.db.query(connection, User.queryPassword(username));

          case 24:
            hashPW = _context3.sent;
            hashPW = hashPW[0]['password'];
            _context3.next = 32;
            break;

          case 28:
            _context3.prev = 28;
            _context3.t2 = _context3["catch"](21);
            console.log(_context3.t2.sqlMessage);
            errMsg = _context3.t2.sqlMessage;

          case 32:
            _context3.prev = 32;
            _context3.next = 35;
            return bcrypt.compare(password, hashPW);

          case 35:
            isValid = _context3.sent;
            _context3.next = 43;
            break;

          case 38:
            _context3.prev = 38;
            _context3.t3 = _context3["catch"](32);
            console.log(_context3.t3);
            connection.release();
            return _context3.abrupt("return", {
              err: _context3.t3,
              msg: 'login failed'
            });

          case 43:
            _context3.prev = 43;
            _context3.next = 46;
            return req.app.db.query(connection, User.queryUserID(username));

          case 46:
            userID = _context3.sent;
            userID = userID[0]['id'];
            _context3.next = 54;
            break;

          case 50:
            _context3.prev = 50;
            _context3.t4 = _context3["catch"](43);
            console.log(_context3.t4.sqlMessage);
            errMsg = _context3.t4.sqlMessage;

          case 54:
            connection.release();

            if (!(isValid === true)) {
              _context3.next = 62;
              break;
            }

            token = uuid4(); // console.log(token);

            _context3.next = 59;
            return req.app.redis.save(token, 3600, userID);

          case 59:
            return _context3.abrupt("return", {
              isPasswordValid: isValid,
              err: errMsg,
              token: token
            });

          case 62:
            return _context3.abrupt("return", {
              isPasswordValid: isValid,
              err: 'login failed, please check password'
            });

          case 63:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 6], [11, 17], [21, 28], [32, 38], [43, 50]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

UserView.logout =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, h) {
    var token, token_new;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log('UserView logout payload : ', req.payload);
            token = req.payload.token;
            _context4.next = 4;
            return req.app.redis.delete(token);

          case 4:
            _context4.prev = 4;
            _context4.next = 7;
            return req.app.redis.get(token);

          case 7:
            token_new = _context4.sent;

            if (!token_new) {
              console.log('token deleted');
            }

            _context4.next = 14;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](4);
            console.log(_context4.t0);

          case 14:
            return _context4.abrupt("return", {
              msg: 'logout successfully'
            });

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[4, 11]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

UserView.userList =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, h) {
    var connection, res, errMsg;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return req.app.db.getConnection();

          case 2:
            connection = _context5.sent;
            _context5.prev = 3;
            _context5.next = 6;
            return req.app.db.query(connection, User.getUserList);

          case 6:
            res = _context5.sent;
            _context5.next = 13;
            break;

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](3);
            console.log(_context5.t0.sqlMessage);
            errMsg = _context5.t0.sqlMessage;

          case 13:
            connection.release();
            return _context5.abrupt("return", {
              res: res,
              err: errMsg
            });

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[3, 9]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

UserView.getUser =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(req, h) {
    var userID, connection, res, errMsg;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            userID = req.params.id;
            _context6.next = 3;
            return req.app.db.getConnection();

          case 3:
            connection = _context6.sent;
            _context6.prev = 4;
            _context6.next = 7;
            return req.app.db.query(connection, User.getUser(userID));

          case 7:
            res = _context6.sent;
            res = res[0];
            _context6.next = 15;
            break;

          case 11:
            _context6.prev = 11;
            _context6.t0 = _context6["catch"](4);
            console.log(_context6.t0.sqlMessage);
            errMsg = _context6.t0.sqlMessage;

          case 15:
            connection.release();

            if (res) {
              _context6.next = 18;
              break;
            }

            return _context6.abrupt("return", {
              err: 'user not exist'
            });

          case 18:
            return _context6.abrupt("return", {
              user: res,
              err: errMsg
            });

          case 19:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[4, 11]]);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

UserView.putUser =
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(req, h) {
    var userID, connection, res, errMsg;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            // update a row in database

            /**
             * UPDATE table 
             * SET      name = 'brian12',
             *          email = 'brianwchh@gmail.com,
             *          password = 'xxxxxxxjjjj',
             * WHERE    id = userID 
             */
            userID = req.params.id;
            _context7.next = 3;
            return req.app.db.getConnection();

          case 3:
            connection = _context7.sent;
            _context7.prev = 4;
            _context7.next = 7;
            return req.app.db.query(connection, User.getUser(userID));

          case 7:
            res = _context7.sent;
            res = res[0];
            _context7.next = 15;
            break;

          case 11:
            _context7.prev = 11;
            _context7.t0 = _context7["catch"](4);
            console.log(_context7.t0.sqlMessage);
            errMsg = _context7.t0.sqlMessage;

          case 15:
            connection.release();

            if (res) {
              _context7.next = 18;
              break;
            }

            return _context7.abrupt("return", {
              err: 'user not exist'
            });

          case 18:
            return _context7.abrupt("return", {
              user: res,
              err: errMsg
            });

          case 19:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[4, 11]]);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

UserView.deleteUser =
/*#__PURE__*/
function () {
  var _ref8 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(req, h) {
    var userID, connection, res, errMsg;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            userID = req.params.id;
            _context8.next = 3;
            return req.app.db.getConnection();

          case 3:
            connection = _context8.sent;
            _context8.prev = 4;
            _context8.next = 7;
            return req.app.db.query(connection, User.deleteUser(userID));

          case 7:
            res = _context8.sent;
            _context8.next = 14;
            break;

          case 10:
            _context8.prev = 10;
            _context8.t0 = _context8["catch"](4);
            console.log(_context8.t0.sqlMessage);
            errMsg = _context8.t0.sqlMessage;

          case 14:
            connection.release();
            return _context8.abrupt("return", {
              msg: "delete user".concat(userID),
              err: errMsg
            });

          case 16:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[4, 10]]);
  }));

  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.UserView = UserView;