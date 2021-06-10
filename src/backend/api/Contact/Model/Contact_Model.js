'use strict';

const Contact_Model = {};

Contact_Model.show = () => {return 'SHOW TABLES LIKE "Contact_Model";'}


/**
 *     webSocketUrl : the contact's websocket connection address 
 *     user_id      : foreign key to the id of User_Model
 *     name : the alias name the user can add for better identification
 *     category_id : 屬於哪一分類類，比如是朋友，同事，同學等等用戶自己創建的類。which category this contact belongs to,for instance: friend,colleague,etc...
 *     token2AccessHim : must provide if want to set up websocket connection on other's server
 *     tokenAssigned2Him  : UNIQUE serial number assigned to the contact 
 *     hisID : the id(given by the contact,either unique user_name or user id on his database)
 *     (user_id,webSocketUrl,hisID) constrain becomes a unqiue id for a contact,for the same person could be a contact to multiple users on this server
 */
Contact_Model.create = () => {
    return `CREATE TABLE IF NOT EXISTS Contact_Model(
        id int primary key auto_increment,
        name varchar(128)not null,
        email varchar(128),
        cellphone varchar(128),
        image varchar(512),
        token2AccessHim varchar(512),
        tokenAssigned2Him varchar(512)UNIQUE,

        webSocketUrl varchar(512)not null,
        hisID        varchar(128)not null,

        category_id int , 
        user_id     int,

        UNIQUE KEY userId_SockectUrl_hisID (user_id,webSocketUrl,hisID),

        createdAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,

        CONSTRAINT Contact_ContactCategory_fk FOREIGN KEY(category_id) REFERENCES ContactCategory_Model(id)
        ON DELETE RESTRICT ,
        CONSTRAINT Contact_User_fk FOREIGN KEY(user_id) REFERENCES User_Model(id)
        ON DELETE RESTRICT 
    )`;
} 

Contact_Model.insertOneRow  = ( name,
                                image,
                                webSocketUrl,
                                hisID,
                                category_id,
                                user_id,
                                token2AccessHim,
                                tokenAssigned2Him
                                ) => {

            return  `INSERT INTO 
                    Contact_Model 
                    (   name,
                        image,
                        webSocketUrl,
                        hisID,
                        category_id,
                        user_id,
                        token2AccessHim,
                        tokenAssigned2Him
                    )
                    VALUES 
                    ("${name}", "${image}", "${webSocketUrl}", "${hisID}", "${category_id}", ${user_id}, "${token2AccessHim}", "${tokenAssigned2Him}")`;
                        
}


Contact_Model.getItemListByUserIdAndCategoryId = (user_id,category_id) => {
    return `SELECT * FROM Contact_Model WHERE user_id=${user_id} AND category_id=${category_id}`
}

Contact_Model.getItemListByUserId = (user_id) => {
    return `SELECT * FROM Contact_Model WHERE user_id=${user_id}`
}

Contact_Model.queryContactViaUser_idWebSocketUrlHisID = (user_id,webSocketUrl,hisID) => {
    return `SELECT * FROM Contact_Model WHERE user_id="${user_id}" AND webSocketUrl="${webSocketUrl}" AND hisID="${hisID}"`
}

Contact_Model.queryContactViaTokenAssigned2Him = (tokenAssigned2Him) => {
    return `SELECT * FROM Contact_Model WHERE tokenAssigned2Him = "${tokenAssigned2Him}"`
}

exports.Contact_Model = Contact_Model;