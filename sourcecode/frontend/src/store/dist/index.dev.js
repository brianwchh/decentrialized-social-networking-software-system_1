"use strict";

var _interopRequireDefault = require("/media/kimsong/u2/project/p2pChat/frontend/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _auth = require("./modules/auth");

_vue.default.use(_vuex.default);

var _default = new _vuex.default.Store({
  modules: {
    auth: _auth.module_auth
  }
});

exports.default = _default;