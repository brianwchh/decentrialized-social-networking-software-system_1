'use strict';

var _interopRequireDefault = require("/media/kimsong/u2/project/p2pChat/frontend/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth_actions = void 0;

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("/media/kimsong/u2/project/p2pChat/frontend/node_modules/@babel/runtime/helpers/esm/asyncToGenerator"));

var _global_config = require("../../../../global_config");

var _ipconfig = require("../../../../ipconfig");

var _axios = _interopRequireDefault(require("axios"));

var _auth_mutations = require("../mutations/auth_mutations");

var auth_actions = {
  login: function () {
    var _login = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(context, payload) {
      var username, password, formDataObj, res, token;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log('auth login action');
              console.log('login action, payload: ', payload);
              username = payload.username, password = payload.password;
              context.commit(_auth_mutations.auth_mutation_strings.SET_LOGGING_STATUS, _auth_mutations.login_status_values.LOGGING);
              formDataObj = {
                username: username,
                password: password
              };
              _context.prev = 5;
              _context.next = 8;
              return _axios.default.post(_ipconfig.user_login_url, JSON.stringify(formDataObj), _global_config.config_json);

            case 8:
              res = _context.sent;

              if (_global_config.debug_ === true) {
                console.log('res : ', res);
              }

              context.commit(_auth_mutations.auth_mutation_strings.SET_LOGGING_STATUS, _auth_mutations.login_status_values.SUCCEED); // get token from server and save it locally

              token = res.data.token;
              localStorage.setItem('token', token); // update the token in state 

              context.commit(_auth_mutations.auth_mutation_strings.UPDATE_TOKEN, token);
              _context.next = 20;
              break;

            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](5);
              console.log(_context.t0);
              context.commit(_auth_mutations.auth_mutation_strings.SET_LOGGING_STATUS, _auth_mutations.login_status_values.FAILED);

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[5, 16]]);
    }));

    function login(_x, _x2) {
      return _login.apply(this, arguments);
    }

    return login;
  }(),
  logout: function () {
    var _logout = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(context) {
      var token, formDataObj, res;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (_global_config.debug_) {
                console.log('auth logout action');
              }

              token = localStorage.getItem('token');
              formDataObj = {
                token: token
              };
              _context2.prev = 3;
              _context2.next = 6;
              return _axios.default.post(_ipconfig.user_logout_url, JSON.stringify(formDataObj), _global_config.config_json);

            case 6:
              res = _context2.sent;

              if (_global_config.debug_ === true) {
                console.log('res : ', res);
              }

              context.commit(_auth_mutations.auth_mutation_strings.SET_LOGGING_STATUS, _auth_mutations.login_status_values.LOGOUT);
              context.commit(_auth_mutations.auth_mutation_strings.UPDATE_TOKEN, ''); // get token from server and save it locally

              localStorage.removeItem('token');
              _context2.next = 17;
              break;

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](3);
              console.log('auth_actions.js :', _context2.t0);
              alert('something wrong while logout');

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[3, 13]]);
    }));

    function logout(_x3) {
      return _logout.apply(this, arguments);
    }

    return logout;
  }(),
  validateToken: function () {
    var _validateToken = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(context, payload) {
      var formDataObj, res;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              formDataObj = {
                token: payload.token
              };
              _context3.prev = 1;
              _context3.next = 4;
              return _axios.default.post(_ipconfig.user_validate_token_url, JSON.stringify(formDataObj), _global_config.config_json);

            case 4:
              res = _context3.sent;

              if (_global_config.debug_ === true) {
                console.log('res : ', res);
              }

              context.commit(_auth_mutations.auth_mutation_strings.UPDATE_TOKEN_VALIDILITY, true);
              _context3.next = 13;
              break;

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](1);
              console.log(_context3.t0);
              context.commit(_auth_mutations.auth_mutation_strings.UPDATE_TOKEN_VALIDILITY, false); // logout the user

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 9]]);
    }));

    function validateToken(_x4, _x5) {
      return _validateToken.apply(this, arguments);
    }

    return validateToken;
  }()
};
exports.auth_actions = auth_actions;