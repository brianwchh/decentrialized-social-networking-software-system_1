"use strict";

require("core-js/modules/es.array.concat");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.item_get_item_by_id = exports.item_add_new_image_url = exports.itemEndPoint = exports.user_detail_rul = exports.user_validate_token_url = exports.user_logout_url = exports.user_login_url = exports.user_register_url = exports.userEndPoint = exports.hostIP = exports.wsuri = void 0;
var wsuri = "ws://52.79.86.10:8964";
exports.wsuri = wsuri;
var hostIP = 'http://localhost:6464';
exports.hostIP = hostIP;
var apiURL = "/api";
var userURL = "/user";
var endPoint = "".concat(hostIP).concat(apiURL);
var userEndPoint = "".concat(endPoint).concat(userURL);
exports.userEndPoint = userEndPoint;
var user_register_url = "".concat(userEndPoint, "/register");
exports.user_register_url = user_register_url;
var user_login_url = "".concat(userEndPoint, "/login");
exports.user_login_url = user_login_url;
var user_logout_url = "".concat(userEndPoint, "/logout");
exports.user_logout_url = user_logout_url;
var user_validate_token_url = "".concat(userEndPoint, "/validatetoken");
exports.user_validate_token_url = user_validate_token_url;

var user_detail_rul = function user_detail_rul(id) {
  return "".concat(userEndPoint, "/").concat(id);
}; // item 


exports.user_detail_rul = user_detail_rul;
var itemURL = "/item";
var itemEndPoint = "".concat(endPoint).concat(itemURL);
exports.itemEndPoint = itemEndPoint;
var item_add_new_image_url = "".concat(itemEndPoint, "/image");
exports.item_add_new_image_url = item_add_new_image_url;

var item_get_item_by_id = function item_get_item_by_id(itemId) {
  return "".concat(itemEndPoint, "/").concat(itemId);
};

exports.item_get_item_by_id = item_get_item_by_id;