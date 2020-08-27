'use strict';

var bcrypt = require('bcrypt');

var Joi = require('@hapi/joi');

var _require = require('../../../config'),
    rootname = _require.rootname;

var _require2 = require('../Model/Item'),
    Item = _require2.Item;

var _require3 = require('../Model/Img'),
    Img = _require3.Img;

var _require4 = require('uuid'),
    uuid4 = _require4.v4;

var fs = require('fs');

var _require5 = require('../../../config'),
    STATIC_ROOT = _require5.STATIC_ROOT;

var ItemView = {};

ItemView.listItems = function _callee(req, h) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", {
            msg: 'get item list'
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

ItemView.createItem = function _callee2(req, h) {
  var connection, res, errMsg, payload, item_name, market_price, price, schema, createItem;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(req.app.db.getConnection());

        case 2:
          connection = _context2.sent;
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(req.app.db.query(connection, Item.createItemTable));

        case 6:
          res = _context2.sent;
          _context2.next = 15;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](3);
          console.log(_context2.t0.sqlMessage);
          errMsg = _context2.t0.sqlMessage;
          connection.release();
          return _context2.abrupt("return", {
            err: errMsg
          });

        case 15:
          _context2.prev = 15;
          _context2.next = 18;
          return regeneratorRuntime.awrap(req.app.db.query(connection, Img.createImgTable));

        case 18:
          res = _context2.sent;
          _context2.next = 27;
          break;

        case 21:
          _context2.prev = 21;
          _context2.t1 = _context2["catch"](15);
          console.log(_context2.t1.sqlMessage);
          errMsg = _context2.t1.sqlMessage;
          connection.release();
          return _context2.abrupt("return", {
            err: errMsg
          });

        case 27:
          // (item_name,market_price,price) 
          payload = req.payload;
          item_name = null;
          market_price = null;
          price = null;

          if (payload) {
            item_name = payload.item_name;
            market_price = payload.market_price;
            price = payload.price;
          }

          schema = Joi.object({
            item_name: Joi.string().required(),
            market_price: Joi.number(),
            price: Joi.number()
          });
          _context2.prev = 33;
          _context2.next = 36;
          return regeneratorRuntime.awrap(schema.validateAsync({
            item_name: item_name,
            market_price: market_price,
            price: price
          }));

        case 36:
          _context2.next = 42;
          break;

        case 38:
          _context2.prev = 38;
          _context2.t2 = _context2["catch"](33);
          console.log(_context2.t2);
          return _context2.abrupt("return", {
            msg: _context2.t2.details
          });

        case 42:
          createItem = Item.insertItem(item_name, market_price, price);
          _context2.prev = 43;
          _context2.next = 46;
          return regeneratorRuntime.awrap(req.app.db.query(connection, createItem));

        case 46:
          res = _context2.sent;
          _context2.next = 53;
          break;

        case 49:
          _context2.prev = 49;
          _context2.t3 = _context2["catch"](43);
          console.log(_context2.t3.sqlMessage);
          errMsg = _context2.t3.sqlMessage;

        case 53:
          // release the coonnection back to pool 
          connection.release();
          return _context2.abrupt("return", {
            msg: res,
            err: errMsg
          });

        case 55:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 9], [15, 21], [33, 38], [43, 49]]);
};

ItemView.itemDetail = function _callee3(req, h) {
  var itemID, connection, res, errMsg;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          itemID = req.params.id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(req.app.db.getConnection());

        case 3:
          connection = _context3.sent;
          _context3.prev = 4;
          _context3.next = 7;
          return regeneratorRuntime.awrap(req.app.db.query(connection, Item.getItem(itemID)));

        case 7:
          res = _context3.sent;
          res = res[0];
          _context3.next = 16;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](4);
          console.log(_context3.t0.sqlMessage);
          errMsg = _context3.t0.sqlMessage;
          return _context3.abrupt("return", {
            err: errMsg
          });

        case 16:
          connection.release();
          return _context3.abrupt("return", {
            item: res
          });

        case 18:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[4, 11]]);
};

ItemView.updateItem = function _callee4(req, h) {
  var itemID, payload, item_name, market_price, price, schema, connection, res, errMsg;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          itemID = req.params.id;
          payload = req.payload;
          item_name = null;
          market_price = null;
          price = null;

          if (payload) {
            item_name = payload.item_name ? payload.item_name : null;
            market_price = payload.market_price ? payload.market_price : null;
            price = payload.price ? payload.price : null;
          }

          schema = Joi.object({
            item_name: Joi.string().required(),
            market_price: Joi.number(),
            price: Joi.number()
          });
          _context4.prev = 7;
          _context4.next = 10;
          return regeneratorRuntime.awrap(schema.validateAsync({
            item_name: item_name,
            market_price: market_price,
            price: price
          }));

        case 10:
          _context4.next = 16;
          break;

        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](7);
          console.log(_context4.t0);
          return _context4.abrupt("return", {
            msg: _context4.t0.details
          });

        case 16:
          _context4.next = 18;
          return regeneratorRuntime.awrap(req.app.db.getConnection());

        case 18:
          connection = _context4.sent;
          _context4.prev = 19;
          _context4.next = 22;
          return regeneratorRuntime.awrap(req.app.db.query(connection, Item.getItem(itemID)));

        case 22:
          res = _context4.sent;
          res = res[0];
          _context4.next = 32;
          break;

        case 26:
          _context4.prev = 26;
          _context4.t1 = _context4["catch"](19);
          console.log(_context4.t1.sqlMessage);
          errMsg = _context4.t1.sqlMessage;
          connection.release();
          return _context4.abrupt("return", {
            err: errMsg
          });

        case 32:
          if (!res) {
            _context4.next = 38;
            break;
          }

          item_name = item_name ? item_name : res.item_name;
          market_price = market_price ? market_price : res.market_price;
          price = price ? price : res.price;
          _context4.next = 40;
          break;

        case 38:
          connection.release();
          return _context4.abrupt("return", {
            err: "item ".concat(itemID, " is empty")
          });

        case 40:
          _context4.prev = 40;
          _context4.next = 43;
          return regeneratorRuntime.awrap(req.app.db.query(connection, Item.updateItem(itemID, item_name, market_price, price)));

        case 43:
          res = _context4.sent;
          _context4.next = 52;
          break;

        case 46:
          _context4.prev = 46;
          _context4.t2 = _context4["catch"](40);
          console.log(_context4.t2.sqlMessage);
          errMsg = _context4.t2.sqlMessage;
          connection.release();
          return _context4.abrupt("return", {
            err: errMsg
          });

        case 52:
          connection.release();
          return _context4.abrupt("return", {
            item: res
          });

        case 54:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[7, 12], [19, 26], [40, 46]]);
};

ItemView.deleteItem = function _callee5(req, h) {
  var itemID, connection, res, errMsg;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          itemID = req.params.id;
          _context5.next = 3;
          return regeneratorRuntime.awrap(req.app.db.getConnection());

        case 3:
          connection = _context5.sent;
          _context5.prev = 4;
          _context5.next = 7;
          return regeneratorRuntime.awrap(req.app.db.query(connection, Item.deleteItem(itemID)));

        case 7:
          res = _context5.sent;
          _context5.next = 16;
          break;

        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](4);
          console.log(_context5.t0.sqlMessage);
          errMsg = _context5.t0.sqlMessage;
          connection.release();
          return _context5.abrupt("return", {
            err: errMsg
          });

        case 16:
          connection.release();
          return _context5.abrupt("return", {
            msg: res
          });

        case 18:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[4, 10]]);
};

ItemView.chartList = function _callee6(req, h) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          return _context6.abrupt("return", {
            msg: 'chart list view'
          });

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
};

ItemView.add2Chart = function _callee7(req, h) {
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          return _context7.abrupt("return", {
            msg: 'add2Chart'
          });

        case 1:
        case "end":
          return _context7.stop();
      }
    }
  });
};

ItemView.getOrderList = function _callee8(req, h) {
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          return _context8.abrupt("return", {
            msg: 'get order items'
          });

        case 1:
        case "end":
          return _context8.stop();
      }
    }
  });
};

ItemView.createOrder = function _callee9(req, h) {
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          return _context9.abrupt("return", {
            msg: 'createOrder from chart'
          });

        case 1:
        case "end":
          return _context9.stop();
      }
    }
  });
};

ItemView.editOrder = function _callee10(req, h) {
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          return _context10.abrupt("return", {
            msg: 'editOrder'
          });

        case 1:
        case "end":
          return _context10.stop();
      }
    }
  });
};

ItemView.deleteOrder = function _callee11(req, h) {
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          return _context11.abrupt("return", {
            msg: 'deleteOrder'
          });

        case 1:
        case "end":
          return _context11.stop();
      }
    }
  });
};

ItemView.createAddress = function _callee12(req, h) {
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          return _context12.abrupt("return", {
            msg: 'createAddress'
          });

        case 1:
        case "end":
          return _context12.stop();
      }
    }
  });
};

ItemView.getAddressList = function _callee13(req, h) {
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          return _context13.abrupt("return", {
            msg: 'getAddressList'
          });

        case 1:
        case "end":
          return _context13.stop();
      }
    }
  });
};

ItemView.getAddressDetail = function _callee14(req, h) {
  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          return _context14.abrupt("return", {
            msg: 'getAddressDetail'
          });

        case 1:
        case "end":
          return _context14.stop();
      }
    }
  });
};

ItemView.editAddress = function _callee15(req, h) {
  return regeneratorRuntime.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          return _context15.abrupt("return", {
            msg: 'editAddress'
          });

        case 1:
        case "end":
          return _context15.stop();
      }
    }
  });
};

ItemView.deleteAddress = function _callee16(req, h) {
  return regeneratorRuntime.async(function _callee16$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          return _context16.abrupt("return", {
            msg: 'deleteAddress'
          });

        case 1:
        case "end":
          return _context16.stop();
      }
    }
  });
};

ItemView.uploadImage = function _callee17(req, h) {
  var payload, now, year, month, day, hour, minute, second, filename, item_id, sub_dir, name_suffix, r, res, rel_path_file, path_file_len, url, url_res, url_to_save_in_db, connection, errMsg, ImgID;
  return regeneratorRuntime.async(function _callee17$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          payload = req.payload;
          now = new Date();
          year = now.getFullYear();
          month = now.getMonth() + 1;
          day = now.getDate();
          hour = now.getHours();
          minute = now.getMinutes();
          second = now.getSeconds();
          console.log(year + '-' + month + '-' + day + '-' + hour + '-' + minute + '-' + second);
          filename = payload.filename;
          item_id = payload.item_id;
          sub_dir = "".concat(item_id, "/").concat(year, "/").concat(month, "/").concat(day);
          name_suffix = hour + '-' + minute + '-' + second;
          r = Math.random().toString(36).substring(7);
          _context17.next = 16;
          return regeneratorRuntime.awrap(req.app.fop.upload("".concat(STATIC_ROOT, "/images/").concat(sub_dir), filename, name_suffix, payload.file));

        case 16:
          res = _context17.sent;
          console.log(res);

          if (!(res.isSucessful === false)) {
            _context17.next = 20;
            break;
          }

          return _context17.abrupt("return", res);

        case 20:
          console.log("path_file = ".concat(res.path_file));
          rel_path_file = res.path_file;
          path_file_len = rel_path_file.length;
          rel_path_file = rel_path_file.slice(1, path_file_len);
          console.log(rel_path_file); // const url = req.connection.protocol 
          //         + '://'
          //         // + req.info.host
          //         + req.url.path ;

          url = req.info.host; // console.log(req.server.info.host);
          // console.log(req.server.info.protocol);
          // console.log(req.server.info.uri);
          // console.log(req.server.info.port);

          url_res = "".concat(req.server.info.uri).concat(rel_path_file);
          url_to_save_in_db = rel_path_file;
          console.log('url_to_save_in_db: ', url_to_save_in_db); // connect to mysql 

          _context17.next = 31;
          return regeneratorRuntime.awrap(req.app.db.getConnection());

        case 31:
          connection = _context17.sent;
          _context17.prev = 32;
          _context17.next = 35;
          return regeneratorRuntime.awrap(req.app.db.query(connection, Img.insertImg(item_id, url_to_save_in_db)));

        case 35:
          res = _context17.sent;
          console.log(res);
          _context17.next = 45;
          break;

        case 39:
          _context17.prev = 39;
          _context17.t0 = _context17["catch"](32);
          console.log(_context17.t0);
          errMsg = _context17.t0.sqlMessage;
          connection.release();
          return _context17.abrupt("return", {
            err: errMsg
          });

        case 45:
          if (res.insertId) {
            _context17.next = 48;
            break;
          }

          // insert image unsuccessful
          connection.release();
          return _context17.abrupt("return", {
            err: 'insert image info to database unsuccessful'
          });

        case 48:
          ImgID = res.insertId;
          _context17.prev = 49;
          _context17.next = 52;
          return regeneratorRuntime.awrap(req.app.db.query(connection, Img.getImg(ImgID)));

        case 52:
          res = _context17.sent;
          res = res[0];
          console.log(res);

          if (res) {
            _context17.next = 58;
            break;
          }

          connection.release();
          return _context17.abrupt("return", {
            err: 'insert image info to database unsuccessful'
          });

        case 58:
          _context17.next = 66;
          break;

        case 60:
          _context17.prev = 60;
          _context17.t1 = _context17["catch"](49);
          console.log(_context17.t1.sqlMessage);
          errMsg = _context17.t1.sqlMessage;
          connection.release();
          return _context17.abrupt("return", {
            err: errMsg
          });

        case 66:
          connection.release();
          console.log(req.server.info.uri);
          res.uri = "".concat(req.server.info.uri).concat(res.uri);
          return _context17.abrupt("return", {
            img: res
          });

        case 70:
        case "end":
          return _context17.stop();
      }
    }
  }, null, null, [[32, 39], [49, 60]]);
};

ItemView.deleteImage = function _callee18(req, h) {
  var imageId, connection, res, errMsg, file, isDeleted, _res;

  return regeneratorRuntime.async(function _callee18$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          imageId = req.params.id; // connect to mysql 

          _context18.next = 3;
          return regeneratorRuntime.awrap(req.app.db.getConnection());

        case 3:
          connection = _context18.sent;
          _context18.prev = 4;
          _context18.next = 7;
          return regeneratorRuntime.awrap(req.app.db.query(connection, Img.getImg(imageId)));

        case 7:
          res = _context18.sent;
          res = res[0];
          console.log(res);

          if (res) {
            _context18.next = 13;
            break;
          }

          connection.release();
          return _context18.abrupt("return", {
            err: "image ".concat(imageId, " not exist in database")
          });

        case 13:
          _context18.next = 21;
          break;

        case 15:
          _context18.prev = 15;
          _context18.t0 = _context18["catch"](4);
          console.log(_context18.t0.sqlMessage);
          errMsg = _context18.t0.sqlMessage;
          connection.release();
          return _context18.abrupt("return", {
            err: errMsg
          });

        case 21:
          // delete from dist   
          file = ".".concat(res.uri);
          _context18.prev = 22;
          _context18.next = 25;
          return regeneratorRuntime.awrap(req.app.fop["delete"](file));

        case 25:
          _res = _context18.sent;
          isDeleted = _res.isDeleted;
          console.log('isDeleted: ', isDeleted);
          _context18.next = 36;
          break;

        case 30:
          _context18.prev = 30;
          _context18.t1 = _context18["catch"](22);
          console.log(_context18.t1);
          connection.release();
          isDeleted = _context18.t1.isDeleted;
          return _context18.abrupt("return", {
            err: _context18.t1
          });

        case 36:
          _context18.prev = 36;
          _context18.next = 39;
          return regeneratorRuntime.awrap(req.app.db.query(connection, Img.deleteImg(imageId)));

        case 39:
          res = _context18.sent;
          _context18.next = 48;
          break;

        case 42:
          _context18.prev = 42;
          _context18.t2 = _context18["catch"](36);
          console.log(_context18.t2.sqlMessage);
          errMsg = _context18.t2.sqlMessage;
          connection.release();
          return _context18.abrupt("return", {
            err: errMsg
          });

        case 48:
          connection.release();
          return _context18.abrupt("return", {
            msg: res
          });

        case 50:
        case "end":
          return _context18.stop();
      }
    }
  }, null, null, [[4, 15], [22, 30], [36, 42]]);
};

exports.ItemView = ItemView;