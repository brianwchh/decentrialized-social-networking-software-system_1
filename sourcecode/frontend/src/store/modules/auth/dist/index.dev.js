'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.module_auth = void 0;

var _auth_mutations = require("./mutations/auth_mutations");

var _auth_actions = require("./actions/auth_actions");

var _auth_getters = require("./getters/auth_getters");

var module_auth = {
  state: function state() {
    return _auth_mutations.state;
  },
  mutations: _auth_mutations.auth_mutations,
  actions: _auth_actions.auth_actions,
  getters: _auth_getters.auth_getters
};
exports.module_auth = module_auth;