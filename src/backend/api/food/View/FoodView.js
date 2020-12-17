'use strict'

const Joi = require('@hapi/joi')

const {FoodCategory} = require('../Model/FoodCategory')
const {Food} = require('../Model/Food')

const FoodView = {

}

FoodView.createFoodCategoryTable = async (req, h)=> {


    let res ;
    let errMsg ;
    let connection ;

    res = await req.app.db.query(connection,FoodCategory.createFoodCategoryTable);

    return {
        data: res ,
        err : req.app.db.getErr(),
    }

}

FoodView.addNewCategory = async (req, h)=> {

    const {payload} = req; 

    console.log(payload);

    let FoodCategoryName = null;

    if(payload){
        FoodCategoryName = payload.FoodCategoryName ;
    }

    const schema = Joi.object({

        FoodCategoryName: Joi.string().required(),

    }) ;

    try {
        await schema.validateAsync({
            FoodCategoryName: FoodCategoryName,
        })
    } catch (err) {
        console.log(err);
        return {
            err : err.details,
            data : [],
        }
    }

    let res ;
    let errMsg ;
    let connection ;

    res = await req.app.db.query(connection,FoodCategory.insertCategory(FoodCategoryName));

    return {
        data: res ,
        err : req.app.db.getErr(),
    }

}


FoodView.getCategoryList = async (req, h)=> {

    let res ;
    let errMsg ;
    let connection ;

    res = await req.app.db.query(connection,FoodCategory.getCategoryList());

    return {
        data: res ,
        err : req.app.db.getErr(),
    }

}

FoodView.insertNewFood = async (req, h)=> {

    let res ;
    let errMsg ;
    let connection ;
    const {payload} = req ;
    // foodName,category_id,price
    const foodName = payload.foodName ;
    const category_id = payload.category_id ;
    const price = payload.price ;

    const schema = Joi.object({

        foodName: Joi.string().required(),
        category_id: Joi.number().required(),
        price: Joi.number().required(),

    }) ;

    try {
        await schema.validateAsync({
            foodName,
            category_id,
            price
        })
    } catch (err) {
        console.log(err);
        return {
            err : err.details[0].message,
            data : [],
        }
    }

    res = await req.app.db.query(connection,Food.insertNewFood(foodName,category_id,price));

    return {
        data: res ,
        err : req.app.db.getErr(),
    }

}



exports.FoodView = FoodView 