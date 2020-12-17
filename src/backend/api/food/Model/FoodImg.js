'use strict'

/**FoodImg : 
 * id: int primary key auto_increment 
 * url: varchar(2048)not null,
 * foodId: int not null
 */

 const FoodImg = {

 }

 FoodImg.createFoodImgTable = `CREATE TABLE IF NOT EXISTS FoodImg
    id int primary key auto_increment,
    url: varchar(2048)not null ,
    foodId: int not null

    CONSTRAINT foodId_fk FOREIGN KEY(foodId) REFERENCES Food(id)
    ON DELETE RESTRICT 
)`;


exports.FoodImg = FoodImg ;