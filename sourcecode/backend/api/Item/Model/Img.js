'use strict'

const {Item} = require('./Item');

const Img = { 

}

Img.createImgTable = `CREATE TABLE IF NOT EXISTS Img(
    id int primary key auto_increment,
    item_id INT not null,
    uri varchar(2048)not null,
    CONSTRAINT img4Item_fk FOREIGN KEY(item_id) REFERENCES Item(id)
    ON DELETE RESTRICT 
)`;

Img.insertImg =  (item_id,uri) => {

    return `INSERT INTO 
                Img 
                (item_id,uri) 
                VALUES 
                (${item_id},'${uri}')`;

}

Img.getImg = (ImgID) => {

    return `SELECT *
            FROM Img
            WHERE id = ${ImgID}`;

}

Img.deleteImg = (imgId) => {

    return `DELETE 
            FROM Img
            WHERE id=${imgId}`;

}

exports.Img = Img;