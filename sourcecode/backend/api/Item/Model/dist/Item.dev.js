'use strict';

var Item = {};
Item.createItemTable = "CREATE TABLE IF NOT EXISTS Item(\n        id int primary key auto_increment,\n        item_name varchar(128)not null,\n        market_price FLOAT ,\n        price FLOAT \n    )";

Item.insertItem = function (item_name, market_price, price) {
  return "INSERT INTO \n                Item \n                (item_name,market_price,price) \n                VALUES \n                ('".concat(item_name, "',").concat(market_price, ",").concat(price, ")");
};

Item.getItem = function (itemID) {
  return "SELECT *\n            FROM Item\n            WHERE id = ".concat(itemID);
};

Item.updateItem = function (itemID, item_name, market_price, price) {
  return "UPDATE Item\n                SET item_name = '".concat(item_name, "', market_price = ").concat(market_price, ", price = ").concat(price, "\n                WHERE id = ").concat(itemID, ";");
};

Item.deleteItem = function (itemID) {
  return "DELETE \n            FROM Item\n            WHERE id=".concat(itemID);
}; // if order_id === null, show in chart.


Item.createOrderItemTable = "CREATE TABLE IF NOT EXISTS OrderItem(\n    id int primary key auto_increment,\n    item_id INT not null, \n    user_id INT not null,\n    order_id INT ,  \n    number INT not null,\n    CONSTRAINT Item_fk FOREIGN KEY(item_id) REFERENCES Item(id)\n    ON DELETE CASCADE ,\n    CONSTRAINT User_fk FOREIGN KEY(user_id) REFERENCES User(id)\n    ON DELETE CASCADE\n)";
Item.createAddressTable = "CREATE TABLE IF NOT EXISTS Address(\n    id int primary key auto_increment,\n    user_id INT not null,\n    address varchar(4096) not null,\n    CONSTRAINT User_fk FOREIGN KEY(user_id) REFERENCES User(id)\n    ON DELETE CASCADE\n)"; // status : 0 : unpaid, 1: paid, 2: delivering , 3: delivered 

Item.createOrderTable = "CREATE TABLE IF NOT EXISTS Order(\n    id int primary key auto_increment,\n    user_id INT not null,\n    total_price INT ,\n    address_id INT ,\n    status INT not null,\n    CONSTRAINT User_fk FOREIGN KEY(user_id) REFERENCES User(id)\n    ON DELETE CASCADE,\n    CONSTRAINT address_fk FOREIGN KEY(address_id) REFERENCES Address(id)\n    ON DELETE CASCADE\n)";
exports.Item = Item;