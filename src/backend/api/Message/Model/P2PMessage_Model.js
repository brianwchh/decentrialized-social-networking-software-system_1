'use strict';

/**
 * direction : true : incoming message, false : outgoing message
 * user_id : the user the message belongs to, a foreign key to the User_Model
 * contact_id : the contact the message is associated with , a foreign key to the Contact_Model
 * MSG : the contec of the message  
 * isRead : true : read, false : unread
 */

const P2PMessage_Model = {};

P2PMessage_Model.show = () => {return 'SHOW TABLES LIKE "P2PMessage_Model";'}


/**
 * direction : true : from user to contact / false : from contact to user
 * 
 */
P2PMessage_Model.create = () => {
    return `CREATE TABLE IF NOT EXISTS P2PMessage_Model(
        id int primary key auto_increment,

        direction  BOOLEAN not null,

        user_id     int not null,
        contact_id  int not null,

        MSG         TEXT ,

        isRead BOOLEAN not null,

        createdAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,

        CONSTRAINT P2PMessage_User_fk FOREIGN KEY(user_id) REFERENCES User_Model(id)
        ON DELETE RESTRICT ,

        CONSTRAINT P2PMessage_Contact_fk FOREIGN KEY(contact_id) REFERENCES Contact_Model(id)
        ON DELETE RESTRICT 
    )`;
} 

P2PMessage_Model.insertOneRow  = ( 
                                direction,
                                user_id,
                                contact_id,
                                MSG,
                                isRead
                                ) => {

            return  `INSERT INTO 
                    P2PMessage_Model 
                    (   
                        direction,
                        user_id,
                        contact_id,
                        MSG,
                        isRead
                    )
                    VALUES 
                    (${direction},${user_id}, ${contact_id},"${MSG}",${isRead})`;
                        
}


P2PMessage_Model.getLastNMessageOfUserIdWithContactId = (N,user_id,contact_id) => {

    return `SELECT * 
            FROM P2PMessage_Model 
            WHERE user_id=${user_id} AND contact_id=${contact_id}
            ORDER BY id DESC LIMIT ${N}`

}

P2PMessage_Model.getNMessageOfUserIdWithContactIdStartingWithId = (N,user_id,contact_id,id) => {
    
    return `SELECT * 
            FROM P2PMessage_Model 
            WHERE user_id=${user_id} AND contact_id=${contact_id} AND id < ${id}
            ORDER BY id DESC LIMIT ${N}`

}

P2PMessage_Model.queryUnreadMsgViaContactIdAndUserId = (user_id,contact_id) => {
    return `SELECT * 
            FROM P2PMessage_Model 
            WHERE user_id=${user_id} AND contact_id=${contact_id} AND isRead = 'false'`
}

P2PMessage_Model.setUnreadMsg2ReadMsgViaContactIdAndUserId = (user_id,contact_id) => {
    return `SELECT * 
            FROM P2PMessage_Model 
            WHERE user_id=${user_id} AND contact_id=${contact_id} AND isRead = false
            `
}

P2PMessage_Model.updateMssageStatusToRead = (user_id,contact_id) => {
    return `UPDATE P2PMessage_Model 
            SET 
                isRead = true
            WHERE user_id=${user_id} AND contact_id=${contact_id} AND isRead = false`
} 

P2PMessage_Model.queryLastNrowsviaContactIdAndUserId = (user_id,contact_id,limit) => {
    return `
        SELECT *
        FROM P2PMessage_Model
        WHERE user_id=${user_id} AND contact_id=${contact_id} 
        ORDER BY id DESC 
        LIMIT 30
    `
}

exports.P2PMessage_Model = P2PMessage_Model;