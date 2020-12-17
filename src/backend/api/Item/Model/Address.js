'use strict'

/**Address : 
 * id: auto 
 * UserId: foreign key 
 * address: xxxxxxxxx
 * isDefualt: defualt value false
 * 
 * after press purchase button, cut these selected chartItems to orderItem
 */

 const Address = {

 }

Address.createAddressTable = `CREATE TABLE IF NOT EXISTS Address(
    id int primary key auto_increment,
    userId int not null,
    isDefault BOOLEAN not null default 0,
    addressField varchar(8192)not null,

    CONSTRAINT address_user_id_fk FOREIGN KEY(userId) REFERENCES User(id)
    ON DELETE RESTRICT 
)`;

Address.insertAddress =  (userId,addressField,isDefault) => {

    return `INSERT INTO 
                Address 
                (userId,addressField,isDefault) 
                VALUES 
                ('${userId}','${addressField}',${isDefault})`;

}

Address.getAddressListByUserId = (userId) => {

    return `Select * 
            FROM Address 
            WHERE userId = ${userId}`;

}


exports.Address = Address ;