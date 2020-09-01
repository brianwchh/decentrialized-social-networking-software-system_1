'use strict'

/**CartItem : 
 * id: auto 
 * userId: foreign key 
 * itemId: foreign key 
 * orderId: foreign key, defualt null for Cart item, otherwise become Order Item 
 * item-cnt: 
 * isSelected: defualt true, for selected items go to purchase stage, unselected stay in Cart
 * price: 
 * total-price: 
 * 
 * after press purchase button, cut these selectedCartItems to orderItem
 */

const CartItem = {

}

CartItem.createCartItemTable = `CREATE TABLE IF NOT EXISTS CartItem(
    id int primary key auto_increment,
    item_id int not null,
    user_id int not null,
    order_id int,
    item_cnt int not null,
    isSelected BOOLEAN not null default 0,
    price float ,
    total_price float,

    CONSTRAINT CI_item_id_fk FOREIGN KEY(item_id) REFERENCES Item(id)
    ON DELETE RESTRICT ,
    CONSTRAINT CI_user_id_fk FOREIGN KEY(user_id) REFERENCES User(id)
    ON DELETE RESTRICT ,
    CONSTRAINT CI_order_id_fk FOREIGN KEY(order_id) REFERENCES OrderTable(id)
    ON DELETE RESTRICT 
)`;


CartItem.insertCartItem =  (item_id,user_id,item_cnt,isSelected,price,total_price) => {

    return `INSERT INTO 
                CartItem 
                (item_id,user_id,item_cnt,isSelected,price,total_price) 
                VALUES 
                (${item_id},${user_id},${item_cnt},${isSelected},${price},${total_price})`;

}

CartItem.getCartItem = (item_id,user_id) => {

    return `SELECT * 
            FROM CartItem
            WHERE item_id = ${item_id} 
                AND user_id = ${user_id}
                AND order_id is NULL 
            ` ;

}

CartItem.updateCartItem = (item_id,user_id,item_cnt,isSelected,price,total_price) => {

    const query_update = `UPDATE CartItem
            SET 
                item_cnt = ${item_cnt},
                isSelected = ${isSelected},
                price = ${price},
                total_price = ${total_price}
            WHERE item_id = ${item_id} AND user_id = ${user_id} AND order_id is NULL `;

    // console.log(query_update);

    return query_update ;
}

CartItem.updateCartItem2order = (item_id,user_id,order_id) => {
    
    return `UPDATE CartItem
            SET 
            order_id = ${order_id}
            WHERE item_id = ${item_id} AND user_id = ${user_id} AND order_id is NULL`;
            // WHERE id = ${CartItem_id}
}  

CartItem.queryByUserId = (user_id) => {

    return `SELECT it.item_name, ci.item_id, ci.user_id, ci.order_id, ci.item_cnt, ci.isSelected, ci.price, ci.total_price  
            FROM CartItem ci 
            JOIN Item it 
            ON ci.item_id = it.id
            WHERE ci.user_id = ${user_id} AND order_id is NULL `

}

CartItem.queryOrderByUserId = (user_id) => {

    return `SELECT it.item_name, ci.item_id, ci.user_id, ci.order_id, ci.item_cnt, ci.isSelected, ci.price, ci.total_price  
            FROM CartItem ci 
            JOIN Item it 
            ON ci.item_id = it.id
            WHERE ci.user_id = ${user_id} AND order_id is NOT NULL `

}

CartItem.deleteCartItems = (item_ids,user_id) => {

    const query_delete_CartItem = `DELETE  
            FROM CartItem
            WHERE user_id = ${user_id} AND item_id IN ${item_ids} AND order_id is NULL` ;
    
    console.log('query_delete_CartItem= :', query_delete_CartItem);

    return query_delete_CartItem ;

}


exports.CartItem = CartItem ;