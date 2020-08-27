'use strict';

const Item = {};

Item.createItemTable = `CREATE TABLE IF NOT EXISTS Item(
        id int primary key auto_increment,
        item_name varchar(128)not null,
        market_price FLOAT ,
        price FLOAT 
    )`;

Item.insertItem =  (item_name,market_price,price) => {

    return `INSERT INTO 
                Item 
                (item_name,market_price,price) 
                VALUES 
                ('${item_name}',${market_price},${price})`;

}

Item.getItem = (itemID) => {

    return `SELECT *
            FROM Item
            WHERE id = ${itemID}`;

}

Item.updateItem = (itemID,item_name,market_price,price) => {
    return `UPDATE Item
                SET item_name = '${item_name}', market_price = ${market_price}, price = ${price}
                WHERE id = ${itemID};`
}

Item.deleteItem = (itemID) => {

    return `DELETE 
            FROM Item
            WHERE id=${itemID}`;

}

// if order_id === null, show in chart.
Item.createOrderItemTable = `CREATE TABLE IF NOT EXISTS OrderItem(
    id int primary key auto_increment,
    item_id INT not null, 
    user_id INT not null,
    order_id INT ,  
    number INT not null,
    CONSTRAINT Item_fk FOREIGN KEY(item_id) REFERENCES Item(id)
    ON DELETE CASCADE ,
    CONSTRAINT User_fk FOREIGN KEY(user_id) REFERENCES User(id)
    ON DELETE CASCADE
)`;

Item.createAddressTable =  `CREATE TABLE IF NOT EXISTS Address(
    id int primary key auto_increment,
    user_id INT not null,
    address varchar(4096) not null,
    CONSTRAINT User_fk FOREIGN KEY(user_id) REFERENCES User(id)
    ON DELETE CASCADE
)`;

// status : 0 : unpaid, 1: paid, 2: delivering , 3: delivered 
Item.createOrderTable = `CREATE TABLE IF NOT EXISTS Order(
    id int primary key auto_increment,
    user_id INT not null,
    total_price INT ,
    address_id INT ,
    status INT not null,
    CONSTRAINT User_fk FOREIGN KEY(user_id) REFERENCES User(id)
    ON DELETE CASCADE,
    CONSTRAINT address_fk FOREIGN KEY(address_id) REFERENCES Address(id)
    ON DELETE CASCADE
)`;



exports.Item = Item;