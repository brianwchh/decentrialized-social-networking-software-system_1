"use strict";

require("core-js/modules/es.array.concat");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.user_detail_rul = exports.user_login_url = exports.user_register_url = exports.hostIP = exports.wsuri = void 0;
var wsuri = "ws://52.79.86.10:8964";
exports.wsuri = wsuri;
var hostIP = 'http://localhost:6464';
exports.hostIP = hostIP;
var apiURL = "/api";
var userURL = "/user";
var endPoint = "".concat(hostIP).concat(apiURL);
var userEndPoint = "".concat(endPoint).concat(userURL);
var user_register_url = "".concat(userEndPoint, "/register");
exports.user_register_url = user_register_url;
var user_login_url = "".concat(userEndPoint, "/login");
exports.user_login_url = user_login_url;

var user_detail_rul = function user_detail_rul(id) {
  return "".concat(userEndPoint, "/").concat(id);
};

exports.user_detail_rul = user_detail_rul;