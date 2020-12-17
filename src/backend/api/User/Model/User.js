'use strict';

const User = {};

User.createUserTable = `CREATE TABLE IF NOT EXISTS User(
        id int primary key auto_increment,
        name varchar(128)not null UNIQUE,
        password varchar(256)not null,
        email varchar(128) UNIQUE,
        isSuper BOOLEAN not null default 0
    )`;

User.insertUser2Table = function(userName,password,email,isSuper){

    return  `INSERT INTO 
            User 
            (name,password,email,isSuper) 
            VALUES 
            ('${userName}','${password}','${email}',${isSuper})`;

}

User.insertSuper2Table = function(userName,password,email){

    return  `INSERT INTO 
            User 
            (name,password,email,isSuper) 
            VALUES 
            ('${userName}','${password}','${email}',true)`;

}

User.queryPassword = function(userName){

    return  `SELECT password
             FROM User
             WHERE name = '${userName}'`;

}

User.queryUserID = function(userName){

    return  `SELECT id
             FROM User
             WHERE name = '${userName}'`;

}

User.getUserList = `SELECT * 
                    FROM User` ;


User.getUser = (userID) => {

    return `SELECT id,name,email,isSuper 
            FROM User
            WHERE id = ${userID}`;

}

User.deleteUser = (userID) => {

    return `DELETE 
            FROM User
            WHERE id=${userID}`;

}

exports.User = User;