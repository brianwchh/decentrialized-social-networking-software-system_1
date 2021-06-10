'use strict';

const Group_Model = {};

Group_Model.show = () => {return 'SHOW TABLES LIKE "Group_Model";'}


/**
 *     webSocketUrl : the contact's websocket connection address 
 *     user_id      : the contact to the user with this id 
 */
Group_Model.create = () => {
    return `CREATE TABLE IF NOT EXISTS Group_Model(
        id int primary key auto_increment,
        name varchar(128)not null,
        email varchar(128),
        cellphone varchar(128),
        image varchar(512),
        about varchar(4096),

        token2AccessHim varchar(512),
        tokenAssigned2Him varchar(512)UNIQUE,

        webSocketUrl varchar(512)not null,
        hisID        varchar(128)not null,

        UNIQUE KEY userId_SockectUrl_hisIDgroup (user_id,webSocketUrl,hisID),

        user_id     int not null,

        createdAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,

        CONSTRAINT Group_User_fk FOREIGN KEY(user_id) REFERENCES User_Model(id)
        ON DELETE RESTRICT 
    )`;
} 

Group_Model.insertOneRow  = (   name,
                                image,
                                webSocketUrl,
                                hisID,
                                user_id,
                                token2AccessHim,
                                tokenAssigned2Him
                                ) => {

            return  `INSERT INTO 
                    Group_Model 
                    (   name,
                        image,
                        webSocketUrl,
                        hisID,
                        user_id,
                        token2AccessHim,
                        tokenAssigned2Him
                    )
                    VALUES 
                    ("${name}","${image}", "${webSocketUrl}","${hisID}",${user_id},"${token2AccessHim}", "${tokenAssigned2Him}")`;
                        
}

Group_Model.getItemListByUserId = (user_id,category_id) => {
    return `SELECT * FROM Group_Model WHERE user_id=${user_id}`
}

exports.Group_Model = Group_Model;