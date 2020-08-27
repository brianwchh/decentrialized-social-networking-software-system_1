'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.state = exports.auth_mutations = void 0;
var state = {
  logging: false,
  isLogin: false
}; // redux's reducer is better, into different branches depending on different action type

exports.state = state;
var auth_mutations = {
  SET_LOGGING_STATUS: function SET_LOGGING_STATUS(state, status) {
    state.logging = status;
  },
  SET_ISLOGIN_STATUS: function SET_ISLOGIN_STATUS(state, status) {
    state.isLogin = status;
  }
};
exports.auth_mutations = auth_mutations;