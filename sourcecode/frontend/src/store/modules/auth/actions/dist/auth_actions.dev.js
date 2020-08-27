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

var auth_actions = {
  login: function () {
    var _login = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(context, payload) {
      var username, password, config, formDataObj, res, token;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log('auth login action');
              username = payload.username, password = payload.password;
              context.commit('SET_LOGGING_STATUS', 'loggining');
              config = {
                headers: {
                  'Content-Type': 'application/json'
                }
              };

              if (_global_config.debug_ === true) {
                console.log(formDataJson);
              }

              formDataObj = {
                username: username,
                password: password
              };
              _context.prev = 6;
              _context.next = 9;
              return _axios.default.post(_ipconfig.user_login_url, JSON.stringify(formDataObj), config);

            case 9:
              res = _context.sent;

              if (_global_config.debug_ === true) {
                console.log('res.data,res : ', res.data.res);
              }

              context.commit('SET_LOGGING_STATUS', 'sucess'); // get token from server and save it locally

              token = res.data.res.token;
              localStorage.setItem('token', token);
              _context.next = 20;
              break;

            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](6);
              console.log(_context.t0);
              context.commit('SET_LOGGING_STATUS', 'failed');

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[6, 16]]);
    }));

    function login(_x, _x2) {
      return _login.apply(this, arguments);
    }

    return login;
  }()
};
exports.auth_actions = auth_actions;