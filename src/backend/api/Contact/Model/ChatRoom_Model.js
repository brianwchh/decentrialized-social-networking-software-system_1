'use strict';

const ChatRoom_Model = {};

ChatRoom_Model.show = () => {return 'SHOW TABLES LIKE "ChatRoom_Model";'}


/**
 *     webSocketUrl : the contact's websocket connection address 
 *     user_id      : the contact to the user with this id 
 */
ChatRoom_Model.create = () => {

    return `CREATE TABLE IF NOT EXISTS ChatRoom_Model(

        id int primary key auto_increment,
        roomName varchar(128)not null UNIQUE,
        image varchar(512) ,

        createdAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,

        user_id int not null,

        CONSTRAINT ChatRoom_User_fk FOREIGN KEY(user_id) REFERENCES User_Model(id)
        ON DELETE RESTRICT 

    )`;

} 

ChatRoom_Model.insertOneRow  = (   
                                roomName,
                                image,
                                user_id
                                ) => {

            return  `INSERT INTO 
                    ChatRoom_Model 
                    (   roomName,
                        image,
                        user_id
                    )
                    VALUES 
                    ("${roomName}","${image}",${user_id})`;
                        
}

ChatRoom_Model.getItemListByUserId = (user_id) => {
    return `SELECT * FROM ChatRoom_Model WHERE user_id=${user_id}`
}


ChatRoom_Model.checkIfUserExistViaID = (ID) => {
    return  `SELECT *
             FROM ChatRoom_Model
             WHERE roomName = '${ID}'`;
}

exports.ChatRoom_Model = ChatRoom_Model;



