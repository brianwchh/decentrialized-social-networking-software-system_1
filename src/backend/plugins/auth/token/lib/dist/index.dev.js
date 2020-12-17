'use strict';

var _typeof = require("/media/kimsong/u2/project/p2pChat/frontend/node_modules/@babel/runtime/helpers/typeof");

require("regenerator-runtime/runtime");

var _asyncToGenerator = require("/media/kimsong/u2/project/p2pChat/frontend/node_modules/@babel/runtime/helpers/asyncToGenerator");

var Boom = require('@hapi/boom');

var Hoek = require('@hapi/hoek');

var internal = {};

internal.scheme_callback = function (server, options) {
  Hoek.assert(options, 'Missing basic auth strategy options');
  Hoek.assert(typeof options.validate === 'function', 'options.validate must be a valid function in token scheme');
  return {
    authenticate: function () {
      var _authenticate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(request, h) {
        var _ref, isValid, credentials;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return options.validate(request);

              case 2:
                _ref = _context.sent;
                isValid = _ref.isValid;
                credentials = _ref.credentials;

                if (isValid) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", h.unauthenticated(Boom.unauthorized("".concat(credentials.err), 'token', options.unauthorizedAttributes)));

              case 7:
                if (!(!credentials || _typeof(credentials) !== 'object')) {
                  _context.next = 9;
                  break;
                }

                throw Boom.badImplementation('Bad credentials object received for token auth validation');

              case 9:
                return _context.abrupt("return", h.authenticated({
                  credentials: credentials
                }));

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function authenticate(_x, _x2) {
        return _authenticate.apply(this, arguments);
      }

      return authenticate;
    }()
  };
};

exports.plugin = {
  name: 'token',
  version: '1.0.0',
  register: function () {
    var _register = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(server, options) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              server.auth.scheme('token', internal.scheme_callback);

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function register(_x3, _x4) {
      return _register.apply(this, arguments);
    }

    return register;
  }()
};