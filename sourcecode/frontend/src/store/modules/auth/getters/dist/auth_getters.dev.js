'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth_getters = void 0;

var _auth_mutations = require("../mutations/auth_mutations");

var auth_getters = {
  getLoginStatus: function getLoginStatus() {
    return _auth_mutations.state.isLogin;
  }
};
exports.auth_getters = auth_getters;