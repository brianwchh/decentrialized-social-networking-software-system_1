'use strict'

/**Order : 
 * id: auto 
 * UserId: foreign key 
 * address: copy from existing address list, or generate a new one to the address list
 * total-price: 
 * status: 0: unpaid, 1: paid, 2: to-be-delevered, 3: devering, 4: revcieved. 5, refund
 * 
 * after press purchase button, cut these selected chartItems to orderItem
 */


const Order = {

}

Order.createOrderTable = `CREATE TABLE IF NOT EXISTS Order(
    id int primary key auto_increment,
    user_id int not null ,
    address varchar(8192),
    total_price float,
    status int not null default 0

    CONSTRAINT user_id_fk FOREIGN KEY(user_id) REFERENCES User(id)
    ON DELETE RESTRICT ,
)`;

Order.insertOrder = (user_id,address,total_price,status) => {
    
    return `INSERT INTO
            Order
            (user_id,address,total_price,status)
            VALUES
            (${user_id},'${address}',${total_price},${status})`;

}

/** ChartItem
 * item_id int not null,
    user_id int not null,
    order_id int,
    item_cnt int not null,
    isSelected BOOLEAN not null default 0,
    price float ,
    total_price float,
 */

Order.getOrderDetail = (order_id) => {

    return `SELECT  o.id, o.user_id, o.address, o.total_price, o.status,
                    ch.item_id, ch.item_cnt, ch.isSelected,ch.price,ch.total_price AS sub_total_price
            FROM Order o
            JOIN ChartItem ch
            ON   o.id = ch.order_id
            WHERE ch.order_id = ${order_id}`
            // or AND user_id = ${user_id}
            
}

Order.getOrderList = (user_id) => {

    return `SELECT  *
            FROM Order
            WHERE user_id = ${user_id}`
            
}

Order.updateOrder = (order_id,address,total_price,status) => {

    return `UPDATE Order
            SET 
                address = ${address},
                total_price = ${total_price},
                status = ${status}
            WHERE 
                id = ${order_id}` ;
    
}

exports.Order = Order ;