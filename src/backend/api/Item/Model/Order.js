'use strict'

/**Order : 
 * id: auto 
 * UserId: foreign key 
 * address: copy from existing address list, or generate a new one to the address list, address ID come and go,
 * this should keep in the record even the address id is deleted. 
 * total-price: 
 * status: 0: unpaid, 1: paid, 2: to-be-delevered, 3: devering, 4: revcieved. 5, refund
 * 
 * after press purchase button, cut these selected chartItems to orderItem
 */


const Order = {

}

// order is a keyword ? dont use key word

Order.createOrderTable = `CREATE TABLE IF NOT EXISTS OrderTable(
    id int primary key auto_increment, 
    user_id int not null ,
    address varchar(8192),
    total_price float,
    status int not null default 0 ,

    CONSTRAINT user_id_fk FOREIGN KEY(user_id) REFERENCES User(id)
    ON DELETE RESTRICT 
)`;

Order.insertOrder = (user_id,address,total_price,status) => {
    
    return `INSERT INTO
            OrderTable
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
                    it.item_name ,
                    ci.item_id, ci.item_cnt, ci.isSelected,ci.price,ci.total_price AS sub_total_price
            FROM CartItem ci 
            JOIN OrderTable o
            ON   o.id = ci.order_id
            JOIN Item it
            ON it.id = ci.item_id
            WHERE ci.order_id = ${order_id}

            ` ;
            // or AND user_id = ${user_id}
            
}

Order.getOrderList = (user_id) => {

    return `SELECT  *
            FROM OrderTable
            WHERE user_id = ${user_id}`
            
}

Order.updateOrder = (order_id,address,total_price,status) => {

    return `UPDATE OrderTable
            SET 
                address = ${address},
                total_price = ${total_price},
                status = ${status}
            WHERE 
                id = ${order_id}` ;
    
}

exports.Order = Order ;