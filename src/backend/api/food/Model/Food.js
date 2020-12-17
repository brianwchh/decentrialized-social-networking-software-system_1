'use strict'

/**food : 
 * id: nt primary key auto_increment 
 * foodName: varchar(128)not null UNIQUE,
 * category_id: int
 */

 const Food = {

 }

Food.createFoodTable = `CREATE TABLE IF NOT EXISTS Food(
    id int primary key auto_increment,
    foodName varchar(128)not null ,
    category_id int not null,
    price int  not null ,

    CONSTRAINT category_id_fk FOREIGN KEY(category_id) REFERENCES FoodCategory(id)
    ON DELETE RESTRICT 
)`;


Food.insertNewFood =  (foodName, category_id, price) => {

    return `INSERT INTO 
            Food
                (foodName,category_id,price) 
                VALUES 
                ('${foodName}',${category_id},${price})`;

}


exports.Food = Food ;