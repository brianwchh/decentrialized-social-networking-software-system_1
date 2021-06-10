'use strict';

/**
 *  TODO : finish the details later
 */

const ChatRoomMessage_Model = {};

ChatRoomMessage_Model.show = () => {return 'SHOW TABLES LIKE "ChatRoomMessage_Model";'}


/**
 * direction : true : from user to group / false : from group to user
 * 
 */
ChatRoomMessage_Model.create = () => {
    return `CREATE TABLE IF NOT EXISTS ChatRoomMessage_Model(
        id int primary key auto_increment,

        direction  BOOLEAN not null,

        user_id     int not null,
        chatroom_id  int not null,

        MSG         TEXT ,

        isRead   BOOLEAN not null,

        createdAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,

        CONSTRAINT ChatRoomMessage_User_fk FOREIGN KEY(user_id) REFERENCES User_Model(id)
        ON DELETE RESTRICT ,

        CONSTRAINT ChatRoomMessage_ChatRoom_fk FOREIGN KEY(group_id) REFERENCES ChatRoom_Model(id)
        ON DELETE RESTRICT 
    )`;
} 

ChatRoomMessage_Model.insertOneRow  = ( 
                direction,
                user_id,
                group_id,
                MSG,
                isRead
    ) => {

            return  `INSERT INTO 
                        P2PMessage_Model 
                        (   
                        direction,
                        user_id,
                        group_id,
                        MSG,
                        isRead
                        )
                        VALUES 
                        (${direction},${user_id}, ${group_id},"${MSG}",${isRead})`;
}


ChatRoomMessage_Model.getLastNMessageOfUserIdWithContactId = (N,user_id,group_id) => {

    return `SELECT * 
            FROM ChatRoomMessage_Model 
            WHERE user_id=${user_id} AND group_id=${group_id}
            ORDER BY id DESC LIMIT ${N}`

}

ChatRoomMessage_Model.getNMessageOfUserIdWithContactIdStartingWithId = (N,user_id,group_id,id) => {
    
    return `SELECT * 
            FROM ChatRoomMessage_Model 
            WHERE user_id=${user_id} AND group_id=${group_id} AND id < ${id}
            ORDER BY id DESC LIMIT ${N}`

}

exports.ChatRoomMessage_Model = ChatRoomMessage_Model;