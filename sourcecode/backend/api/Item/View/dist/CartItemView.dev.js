'use strict';

var bcrypt = require('bcrypt');

var Joi = require('@hapi/joi');

var _require = require('../../../config'),
    rootname = _require.rootname;

var _require2 = require('../Model/Item'),
    Item = _require2.Item;

var _require3 = require('../Model/Img'),
    Img = _require3.Img;

var _require4 = require('../Model/ChartItem'),
    ChartItem = _require4.ChartItem;

var _require5 = require('uuid'),
    uuid4 = _require5.v4;

var fs = require('fs');

var _require6 = require('../../../config'),
    STATIC_ROOT = _require6.STATIC_ROOT;

var ChartItemView = {};

ChartItemView.createChartItemTable = function _callee(req, h) {
  var connection, res, errMsg;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(req.app.db.getConnection());

        case 2:
          connection = _context.sent;
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(req.app.db.query(connection, ChartItem.createChartItemTable));

        case 6:
          res = _context.sent;
          _context.next = 15;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](3);
          console.log(_context.t0.sqlMessage);
          errMsg = _context.t0.sqlMessage;
          connection.release();
          return _context.abrupt("return", {
            err: errMsg
          });

        case 15:
          connection.release();
          return _context.abrupt("return", {
            msg: res
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 9]]);
};

ChartItemView.add2Chart = function _callee2(req, h) {
  var payload, user_id, item_id, item_cnt, price, total_price, isSelected, connection, res, errMsg, sel_item_cnt, sel_total_price, updated_item_cnt, updated_total_price;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // item_id,user_id,item_cnt,price,total_price
          payload = req.payload;
          console.log(payload);
          user_id = payload.user_id;
          item_id = payload.item_id;
          item_cnt = Number(payload.item_cnt);
          price = Number(payload.price);
          total_price = Number(item_cnt) * Number(price);
          isSelected = payload.isSelected; // connect to mysql 

          _context2.next = 10;
          return regeneratorRuntime.awrap(req.app.db.getConnection());

        case 10:
          connection = _context2.sent;
          _context2.prev = 11;
          _context2.next = 14;
          return regeneratorRuntime.awrap(req.app.db.query(connection, ChartItem.getChartItem(item_id, user_id)));

        case 14:
          res = _context2.sent;
          res = res[0];
          console.log('getChartItem : ', res);
          _context2.next = 24;
          break;

        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](11);
          console.log(_context2.t0.sqlMessage);
          errMsg = _context2.t0.sqlMessage;
          return _context2.abrupt("return", {
            err: errMsg
          });

        case 24:
          if (res) {
            _context2.next = 39;
            break;
          }

          _context2.prev = 25;
          _context2.next = 28;
          return regeneratorRuntime.awrap(req.app.db.query(connection, ChartItem.insertChartItem(item_id, user_id, item_cnt, isSelected, price, total_price)));

        case 28:
          res = _context2.sent;
          res = res[0];
          _context2.next = 37;
          break;

        case 32:
          _context2.prev = 32;
          _context2.t1 = _context2["catch"](25);
          console.log(_context2.t1.sqlMessage);
          errMsg = _context2.t1.sqlMessage;
          return _context2.abrupt("return", {
            err: errMsg
          });

        case 37:
          _context2.next = 55;
          break;

        case 39:
          sel_item_cnt = res.item_cnt;
          sel_total_price = res.total_price;
          updated_item_cnt = Number(sel_item_cnt) + Number(item_cnt);
          updated_total_price = Number(sel_total_price) + Number(price * item_cnt);
          _context2.prev = 43;
          _context2.next = 46;
          return regeneratorRuntime.awrap(req.app.db.query(connection, ChartItem.updateChartItem(item_id, user_id, updated_item_cnt, isSelected, price, updated_total_price)));

        case 46:
          res = _context2.sent;
          _context2.next = 55;
          break;

        case 49:
          _context2.prev = 49;
          _context2.t2 = _context2["catch"](43);
          console.log(_context2.t2.sqlMessage);
          errMsg = _context2.t2.sqlMessage;
          connection.release();
          return _context2.abrupt("return", {
            err: errMsg
          });

        case 55:
          _context2.prev = 55;
          _context2.next = 58;
          return regeneratorRuntime.awrap(req.app.db.query(connection, ChartItem.getChartItem(item_id, user_id)));

        case 58:
          res = _context2.sent;
          res = res[0];
          console.log('getChartItem : ', res);
          _context2.next = 68;
          break;

        case 63:
          _context2.prev = 63;
          _context2.t3 = _context2["catch"](55);
          console.log(_context2.t3.sqlMessage);
          errMsg = _context2.t3.sqlMessage;
          return _context2.abrupt("return", {
            err: errMsg
          });

        case 68:
          connection.release();
          return _context2.abrupt("return", {
            msg: res
          });

        case 70:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[11, 19], [25, 32], [43, 49], [55, 63]]);
};

ChartItemView.listChartItem = function _callee3(req, h) {
  var user_id, connection, res, errMsg;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          user_id = req.headers.user_id; // connect to mysql 

          _context3.next = 3;
          return regeneratorRuntime.awrap(req.app.db.getConnection());

        case 3:
          connection = _context3.sent;
          _context3.prev = 4;
          _context3.next = 7;
          return regeneratorRuntime.awrap(req.app.db.query(connection, ChartItem.queryByUserId(user_id)));

        case 7:
          res = _context3.sent;
          // res = res[0];
          console.log('getChartItem : ', res);
          _context3.next = 17;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](4);
          console.log(_context3.t0.sqlMessage);
          errMsg = _context3.t0.sqlMessage;
          connection.release();
          return _context3.abrupt("return", {
            err: errMsg
          });

        case 17:
          connection.release();
          return _context3.abrupt("return", {
            msg: res
          });

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[4, 11]]);
};

ChartItemView.delteChartItems = function _callee4(req, h) {
  var user_id, item_ids, connection, res, errMsg;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          /**
           * SELECT * 
              FROM orders 
              WHERE state IN ( ‘VA’ , ‘GA’ , ‘FL’) 
           */
          user_id = req.headers.user_id;
          item_ids = req.headers.item_ids; // connect to mysql 

          _context4.next = 4;
          return regeneratorRuntime.awrap(req.app.db.getConnection());

        case 4:
          connection = _context4.sent;
          _context4.prev = 5;
          _context4.next = 8;
          return regeneratorRuntime.awrap(req.app.db.query(connection, ChartItem.deleteChartItems(item_ids, user_id)));

        case 8:
          res = _context4.sent;
          // res = res[0];
          console.log('getChartItem : ', res);
          _context4.next = 18;
          break;

        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](5);
          console.log(_context4.t0.sqlMessage);
          errMsg = _context4.t0.sqlMessage;
          connection.release();
          return _context4.abrupt("return", {
            err: errMsg
          });

        case 18:
          connection.release();
          return _context4.abrupt("return", {
            msg: res
          });

        case 20:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[5, 12]]);
};

ChartItemView.editChart = function _callee5(req, h) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          return _context5.abrupt("return", {
            msg: 'editChart'
          });

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.ChartItemView = ChartItemView;