'use strict';
/**ChartItem : 
 * id: auto 
 * userId: foreign key 
 * itemId: foreign key 
 * orderId: foreign key, defualt null for Chart item, otherwise become Order Item 
 * item-cnt: 
 * isSelected: defualt true, for selected items go to purchase stage, unselected stay in Chart
 * price: 
 * total-price: 
 * 
 * after press purchase button, cut these selectedChartItems to orderItem
 */

var ChartItem = {};
ChartItem.createChartItemTable = "CREATE TABLE IF NOT EXISTS ChartItem(\n    item_id int not null,\n    user_id int not null,\n    order_id int,\n    item_cnt int not null,\n    isSelected BOOLEAN not null default 0,\n    price float ,\n    total_price float,\n    PRIMARY KEY (item_id, user_id) ,\n    CONSTRAINT item_id_fk FOREIGN KEY(item_id) REFERENCES Item(id)\n    ON DELETE RESTRICT ,\n    CONSTRAINT user_id_fk FOREIGN KEY(user_id) REFERENCES User(id)\n    ON DELETE RESTRICT ,\n    CONSTRAINT order_id_fk FOREIGN KEY(order_id) REFERENCES Order(id)\n    ON DELETE RESTRICT ,\n)";

ChartItem.insertChartItem = function (item_id, user_id, item_cnt, isSelected, price, total_price) {
  return "INSERT INTO \n                ChartItem \n                (item_id,user_id,item_cnt,isSelected,price,total_price) \n                VALUES \n                (".concat(item_id, ",").concat(user_id, ",").concat(item_cnt, ",").concat(isSelected, ",").concat(price, ",").concat(total_price, ")");
};

ChartItem.getChartItem = function (item_id, user_id) {
  return "SELECT * \n            FROM ChartItem\n            WHERE item_id = ".concat(item_id, " \n                AND user_id = ").concat(user_id, "\n            ");
};

ChartItem.updateChartItem = function (item_id, user_id, item_cnt, isSelected, price, total_price) {
  var query_update = "UPDATE ChartItem\n            SET \n                item_cnt = ".concat(item_cnt, ",\n                isSelected = ").concat(isSelected, ",\n                price = ").concat(price, ",\n                total_price = ").concat(total_price, "\n            WHERE item_id = ").concat(item_id, " and user_id = ").concat(user_id, ";"); // console.log(query_update);

  return query_update;
};

ChartItem.queryByUserId = function (user_id) {
  return "SELECT * \n            FROM ChartItem\n            WHERE user_id = ".concat(user_id, " AND order_id IS null");
};

ChartItem.deleteChartItems = function (item_ids, user_id) {
  var query_delete_ChartItem = "DELETE  \n            FROM ChartItem\n            WHERE user_id = ".concat(user_id, " AND item_id IN ").concat(item_ids);
  console.log('query_delete_ChartItem= :', query_delete_ChartItem);
  return query_delete_ChartItem;
};

exports.ChartItem = ChartItem;