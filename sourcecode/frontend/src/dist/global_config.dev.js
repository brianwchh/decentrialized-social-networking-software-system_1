"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config_multipart = exports.config_json = exports.debug_ = void 0;
var debug_ = true; // axios settings 

exports.debug_ = debug_;
var config_json = {
  headers: {
    'Content-Type': 'application/json'
  }
};
exports.config_json = config_json;
var config_multipart = {
  eaders: {
    'Content-Type': 'multipart/form-data'
  }
};
exports.config_multipart = config_multipart;