'user strict';
// const Joi = require('@hapi/joi')

const {FoodView} = require('./../View/FoodView');


Route = [

    {
        path: '/api/food/createcategorytable',
        method: 'POST', 
        handler : FoodView.createFoodCategoryTable
    },

    {
        path: '/api/food/addnewcategory',
        method: 'POST', 
        options: {
            payload: {
                parse: true,
                allow: 'application/json',
                // multipart: false
            },
            auth: 'isSuperUser',
        },
        handler : FoodView.addNewCategory
    },

    {
        path: '/api/food/getcategorylist',
        method: 'GET', 

        handler : FoodView.getCategoryList
    },

    {
        path: '/api/food/insertnewfood',
        method: 'POST', 
        options: {
            payload: {
                parse: true,
                allow: 'application/json',
                // multipart: false
            },
            auth: 'isSuperUser',
        },

        handler : FoodView.insertNewFood
    },

]

module.exports = Route  ;