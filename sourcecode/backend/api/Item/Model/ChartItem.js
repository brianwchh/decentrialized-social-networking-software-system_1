'use strict'

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

const ChartItem = {

}

ChartItem.createChartItemTable = `CREATE TABLE IF NOT EXISTS ChartItem(
    item_id int not null,
    user_id int not null,
    order_id int,
    item_cnt int not null,
    isSelected BOOLEAN not null default 0,
    price float ,
    total_price float,
    PRIMARY KEY (item_id, user_id) ,
    CONSTRAINT item_id_fk FOREIGN KEY(item_id) REFERENCES Item(id)
    ON DELETE RESTRICT ,
    CONSTRAINT user_id_fk FOREIGN KEY(user_id) REFERENCES User(id)
    ON DELETE RESTRICT ,
    CONSTRAINT order_id_fk FOREIGN KEY(order_id) REFERENCES Order(id)
    ON DELETE RESTRICT ,
)`;


ChartItem.insertChartItem =  (item_id,user_id,item_cnt,isSelected,price,total_price) => {

    return `INSERT INTO 
                ChartItem 
                (item_id,user_id,item_cnt,isSelected,price,total_price) 
                VALUES 
                (${item_id},${user_id},${item_cnt},${isSelected},${price},${total_price})`;

}

ChartItem.getChartItem = (item_id,user_id) => {

    return `SELECT * 
            FROM ChartItem
            WHERE item_id = ${item_id} 
                AND user_id = ${user_id}
            `

}

ChartItem.updateChartItem = (item_id,user_id,item_cnt,isSelected,price,total_price) => {

    const query_update = `UPDATE ChartItem
            SET 
                item_cnt = ${item_cnt},
                isSelected = ${isSelected},
                price = ${price},
                total_price = ${total_price}
            WHERE item_id = ${item_id} and user_id = ${user_id};`

    // console.log(query_update);

    return query_update ;
}

ChartItem.queryByUserId = (user_id) => {

    return `SELECT * 
            FROM ChartItem
            WHERE user_id = ${user_id} AND order_id IS null`

}

ChartItem.deleteChartItems = (item_ids,user_id) => {

    const query_delete_ChartItem = `DELETE  
            FROM ChartItem
            WHERE user_id = ${user_id} AND item_id IN ${item_ids}` ;
    
    console.log('query_delete_ChartItem= :', query_delete_ChartItem);

    return query_delete_ChartItem ;

}


exports.ChartItem = ChartItem ;