'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth_getters_strings = exports.auth_getters = void 0;

var _auth_mutations = require("../mutations/auth_mutations");

var auth_getters = {
  getLoginStatus: function getLoginStatus() {
    return _auth_mutations.state.login_status;
  },
  getToken: function getToken() {
    return _auth_mutations.state.token;
  },
  getTokenStatus: function getTokenStatus() {
    return _auth_mutations.state.isTokenValid;
  }
};
exports.auth_getters = auth_getters;
var auth_getters_strings = {
  GET_LOGIN_STATUS: 'getLoginStatus',
  GET_TOKEN: 'getToken',
  GET_TOKEN_STATUS: 'getTokenStatus'
};
exports.auth_getters_strings = auth_getters_strings;