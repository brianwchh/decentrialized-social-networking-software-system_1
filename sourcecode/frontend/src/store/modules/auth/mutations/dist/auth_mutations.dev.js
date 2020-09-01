'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login_status_values = exports.auth_mutation_strings = exports.auth_mutations = exports.state = void 0;

var _global_config = require("../../../../global_config");

var state = {
  login_status: '',
  token: '',
  isTokenValid: false
}; // redux's reducer is better, into different branches depending on different action type

exports.state = state;
var auth_mutations = {
  SET_LOGGING_STATUS: function SET_LOGGING_STATUS(state, status) {
    state.login_status = status;

    if (_global_config.debug_) {
      console.log("auth_mutations.js : state.login_status : ", state.login_status);
    }
  },
  UPDATE_TOKEN: function UPDATE_TOKEN(state, token) {
    state.token = token;
  },
  UPDATE_TOKEN_VALIDILITY: function UPDATE_TOKEN_VALIDILITY(state, status) {
    state.isTokenValid = status;
  }
};
exports.auth_mutations = auth_mutations;
var auth_mutation_strings = {
  SET_LOGGING_STATUS: 'SET_LOGGING_STATUS',
  UPDATE_TOKEN: 'UPDATE_TOKEN',
  UPDATE_TOKEN_VALIDILITY: 'UPDATE_TOKEN_VALIDILITY'
};
exports.auth_mutation_strings = auth_mutation_strings;
var login_status_values = {
  LOGGING: 'logging',
  SUCCEED: 'succeed',
  FAILED: 'failed',
  LOGOUT: 'logout'
};
exports.login_status_values = login_status_values;