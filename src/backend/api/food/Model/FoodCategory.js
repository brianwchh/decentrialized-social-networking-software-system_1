'use strict'

/**FoodCategory : 
 * id: nt primary key auto_increment 
 * FoodCategoryName: varchar(128)not null UNIQUE,
 * 
 */

 const FoodCategory = {

 }

 FoodCategory.createFoodCategoryTable = `CREATE TABLE IF NOT EXISTS FoodCategory (
    id int primary key auto_increment,
    FoodCategoryName varchar(128)not null UNIQUE)`;


FoodCategory.insertCategory =  (FoodCategoryName) => {

    return `INSERT INTO 
            FoodCategory 
                (FoodCategoryName) 
                VALUES 
                ('${FoodCategoryName}')`;

}

FoodCategory.getCategoryList = () => {

    return `SELECT *
            FROM  FoodCategory `;

}


exports.FoodCategory = FoodCategory ;