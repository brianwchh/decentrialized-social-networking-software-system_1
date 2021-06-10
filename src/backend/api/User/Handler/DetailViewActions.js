const {httpStatus} = require('../../../httpStatus')
const {getSafeProperty} = require('../../../utility/getSafeProperty')
const {isRequestFormDataNull} = require('../../../utility/isRequestFormDataNull')
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const { User_Model } = require('../Model/User_Model');
const {v4:uuid4} = require('uuid');
const {isLogin} = require('../../../auth_validates/isLogin')


const DetailViewActions = {

}


exports.DetailViewActions = DetailViewActions 


