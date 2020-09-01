'use strict';

require("core-js/modules/es.array.concat");

var _require = require('./Item'),
    Item = _require.Item;

var Img = {};
Img.createImgTable = "CREATE TABLE IF NOT EXISTS Img(\n    id int primary key auto_increment,\n    item_id INT not null,\n    uri varchar(2048)not null,\n    CONSTRAINT img4Item_fk FOREIGN KEY(item_id) REFERENCES Item(id)\n    ON DELETE RESTRICT \n)";

Img.insertImg = function (item_id, uri) {
  return "INSERT INTO \n                Img \n                (item_id,uri) \n                VALUES \n                (".concat(item_id, ",'").concat(uri, "')");
};

Img.getImg = function (ImgID) {
  return "SELECT *\n            FROM Img\n            WHERE id = ".concat(ImgID);
};

Img.getImgs = function (item_id) {
  return "SELECT uri\n            FROM Img\n            WHERE item_id = ".concat(item_id);
};

Img.deleteImg = function (imgId) {
  return "DELETE \n            FROM Img\n            WHERE id=".concat(imgId);
};

exports.Img = Img;