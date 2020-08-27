'use strict';
/**Order : 
 * id: auto 
 * UserId: foreign key 
 * address: copy from existing address list, or generate a new one to the address list
 * total-price: 
 * status: 0: unpaid, 1: paid, 2: to-be-delevered, 3: devering, 4: revcieved. 5, refund
 * 
 * after press purchase button, cut these selected chartItems to orderItem
 */

var Order = {};
Order.createOrderTable = "CREATE TABLE IF NOT EXISTS Order(\n    id int primary key auto_increment,\n    user_id int not null ,\n    address varchar(8192),\n    total_price float,\n    status int not null default 0\n\n    CONSTRAINT user_id_fk FOREIGN KEY(user_id) REFERENCES User(id)\n    ON DELETE RESTRICT ,\n)";

Order.insertOrder = function (user_id, address, total_price, status) {
  return "INSERT INTO\n            Order\n            (user_id,address,total_price,status)\n            VALUES\n            (".concat(user_id, ",'").concat(address, "',").concat(total_price, ",").concat(status, ")");
};
/** ChartItem
 * item_id int not null,
    user_id int not null,
    order_id int,
    item_cnt int not null,
    isSelected BOOLEAN not null default 0,
    price float ,
    total_price float,
 */


Order.getOrderDetail = function (order_id) {
  return "SELECT  o.id, o.user_id, o.address, o.total_price, o.status,\n                    ch.item_id, ch.item_cnt, ch.isSelected,ch.price,ch.total_price AS sub_total_price\n            FROM Order o\n            JOIN ChartItem ch\n            ON   o.id = ch.order_id\n            WHERE ch.order_id = ".concat(order_id); // or AND user_id = ${user_id}
};

Order.getOrderList = function (user_id) {
  return "SELECT  *\n            FROM Order\n            WHERE user_id = ".concat(user_id);
};

Order.updateOrder = function (order_id, address, total_price, status) {
  return "UPDATE Order\n            SET \n                address = ".concat(address, ",\n                total_price = ").concat(total_price, ",\n                status = ").concat(status, "\n            WHERE \n                id = ").concat(order_id);
};

exports.Order = Order;