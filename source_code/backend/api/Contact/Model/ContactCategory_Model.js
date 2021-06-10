'use strict';


/**
 * name : name of the category for the Contact,for isntance: friend,colleague
 * user_id : the user id which this row of ContactCategory_Model belongs to,a foreign key
 */


const ContactCategory_Model = {};

ContactCategory_Model.show = () => {return 'SHOW TABLES LIKE "ContactCategory_Model";'}

ContactCategory_Model.create = () => {
    return `CREATE TABLE IF NOT EXISTS ContactCategory_Model(
        id int primary key auto_increment,
        name varchar(128)not null UNIQUE,

        createdAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,

        user_id int not null,

        CONSTRAINT ContactCategory_User_fk FOREIGN KEY(user_id) REFERENCES User_Model(id)
        ON DELETE RESTRICT 

    )`;
} 


ContactCategory_Model.queryItemList = () => {
    return `SELECT * FROM 
            ContactCategory_Model
    `
}

ContactCategory_Model.insertOneRow = (name,user_id) => {
    return `INSERT INTO 
                ContactCategory_Model 
                (   name,
                    user_id
                )
                VALUES 
                ("${name}",${user_id})`;
}


exports.ContactCategory_Model = ContactCategory_Model;