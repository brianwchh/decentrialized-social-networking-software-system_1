'use strict';

const User_Model = {};

User_Model.checkUserTable = 'SHOW TABLES LIKE "User_Model";'

User_Model.createUserTable = `CREATE TABLE IF NOT EXISTS User_Model(
        id int primary key auto_increment,
        name varchar(128)not null UNIQUE,
        password varchar(256)not null,
        email varchar(128) UNIQUE,
        isSuper BOOLEAN not null default 0 ,
        image varchar(512) ,

        createdAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
    )`;

User_Model.insertUser2Table = function(userName,password,email,isSuper){

    return  `INSERT INTO 
            User_Model 
            (name,password,email,isSuper) 
            VALUES 
            ('${userName}','${password}','${email}',${isSuper})`;

}

User_Model.insertSuper2Table = function(userName,password,email){

    return  `INSERT INTO 
            User_Model 
            (name,password,email,isSuper) 
            VALUES 
            ('${userName}','${password}','${email}',true)`;

}

User_Model.queryPasswordByUserName = function(userName){

    return  `SELECT password,id,name
             FROM User_Model
             WHERE name = '${userName}'`;

}

User_Model.queryPasswordByEmail = function(email){

    return  `SELECT password,id,name
             FROM User_Model
             WHERE email = '${email}'`;

}

User_Model.queryUserID = function(userName){

    return  `SELECT id
             FROM User_Model
             WHERE name = '${userName}'`;

}

User_Model.getUserList = `SELECT * 
                    FROM User_Model` ;


User_Model.getUser = (user_id) => {

    return `SELECT id,name,email,isSuper 
            FROM User_Model
            WHERE id = ${user_id}`;

}

User_Model.getUserViaId = (user_id) => {

    return `SELECT * 
            FROM User_Model
            WHERE id = ${user_id}`;
}

User_Model.deleteUser = (user_id) => {

    return `DELETE 
            FROM User_Model
            WHERE id=${user_id}`;

}

User_Model.checkUserByIdOrName = (idOrName) => {
    return `SELECT * 
            FROM  User_Model
            WHERE id='${idOrName}' OR name='${idOrName}'`
}

User_Model.checkIfUserExistViaID = (ID) => {
    return  `SELECT *
             FROM User_Model
             WHERE name = '${ID}'`;
}

exports.User_Model = User_Model;


