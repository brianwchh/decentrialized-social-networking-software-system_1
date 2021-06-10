'use strict';

/**
 * it is easy to render P2P message by FROM and To, so it is easy to know that from WHO this message is from. 
 * how about group message, to make things simple, it should be as the same as the P2P message, except that now the other party is the 
 * room ID in the group owner's server, so it is basicall the same as P2P. 
 * The difference is that the RoomID broadcasting the same message to all its members, while the PeerID on the server only send the message to his Contact.
 * For the Group message, it is up to the group onwner's decision whether to show the name of the FROM Peer inside each message.
 * 
 */

const GPMessage_Model = {};

GPMessage_Model.show = () => {return 'SHOW TABLES LIKE "GPMessage_Model";'}


/**
 * direction : true : from user to group / false : from group to user
 * 
 */
GPMessage_Model.create = () => {
    return `CREATE TABLE IF NOT EXISTS GPMessage_Model(
        id int primary key auto_increment,

        direction  BOOLEAN not null,

        user_id     int not null,
        group_id  int not null,

        MSG         TEXT ,

        isRead   BOOLEAN not null,

        createdAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,

        CONSTRAINT GPMessage_User_fk FOREIGN KEY(user_id) REFERENCES User_Model(id)
        ON DELETE RESTRICT ,

        CONSTRAINT GPMessage_Group_fk FOREIGN KEY(group_id) REFERENCES Group_Model(id)
        ON DELETE RESTRICT 
    )`;
} 

GPMessage_Model.insertOneRow  = ( 
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


GPMessage_Model.getLastNMessageOfUserIdWithContactId = (N,user_id,group_id) => {

    return `SELECT * 
            FROM GPMessage_Model 
            WHERE user_id=${user_id} AND group_id=${group_id}
            ORDER BY id DESC LIMIT ${N}`

}

GPMessage_Model.getNMessageOfUserIdWithContactIdStartingWithId = (N,user_id,group_id,id) => {
    
    return `SELECT * 
            FROM GPMessage_Model 
            WHERE user_id=${user_id} AND group_id=${group_id} AND id < ${id}
            ORDER BY id DESC LIMIT ${N}`

}

exports.GPMessage_Model = GPMessage_Model;