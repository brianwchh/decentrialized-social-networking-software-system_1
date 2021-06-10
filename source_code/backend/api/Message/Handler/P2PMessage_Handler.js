'use strict' 

/**
 *  1. 像js這種類型不嚴謹的語言，接口最好是統一口徑（像verilog一樣嚴謹地把每個模塊的輸入輸出接口spec寫詳細）：用obj把返回類型定好，不要一會返回查詢值，一會返回錯誤，在函數定義中盡量寫清楚參數的類型，雖然沒有報錯提醒功能，
 *      但方便日後查閱，好記性不如爛筆頭
 *  2. 寫詳細的打印位置和出錯原因，方便前後端調試時定位出問題，磨刀不誤坎柴功，代碼採用基本統一的框架，然後功能擴展就基本上是copy-paste的少量改動，如果可以就用參數化，實現
 * 代碼復用。
 *  3. 一個不檢查語法的語言，鬼都不知道自己寫出來的程序裏面一不小心走神埋下了多少雷，寫代碼一時爽，找雷把腦子都給繞暈了
 *  4. 一會null,一會undefined,一會‘’，undefined還不等於'undefined'
 *  5. "" 字符一定要習慣統一用這個雙引號，而不要用''，碰到xx's你就頭大了。
 */


const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi')
const {rootname} = require('../../../config')
const {v4:uuid4} = require('uuid');
const { httpStatus } = require('../../../httpStatus');
const {isRequestFormDataNull} = require('../../../utility/isRequestFormDataNull')
const {isLogin} = require('../../../auth_validates/isLogin');
const { getSafeProperty } = require('../../../utility/getSafeProperty');
const {my_wsuri} = require('../../../ipport')
const {P2PMessage_Model} = require('../Model/P2PMessage_Model')

const P2PMessage_Handler = {}


/**
 * get Contact item list based on token
 * @param {*} req 
 * @param {*} h 
 */
P2PMessage_Handler.getDetailView = async (req, h)=> { 

    // validate token
    const data = {
        querySet : [],
        error : ['method not allowed'],
        statusCode: httpStatus.MethodNotAllowed,
        message : [],
        atributes: {},
    }

    const validateRes = await isLogin.validate(req.app.redis, req.query.token)

    const isLoginValid = (validateRes.errorArray != 0)? false : true ;

    if (isLoginValid == false){
        data.message = '@P2PMessage_Handler.js -> getListView, token expire or null, validate before submit in frontend'
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return h.response(data).code(data.statusCode)
    }

    // 2. get contact_id, messageStatus,offset,pageLen
    const contact_id = req.query.contact_id
    const user_id = req.query.user_id
    const messageStatus = req.query.status // read / unread/ all 
    const offset = req.query.offset // for pagination purpose,the starting id of the messages 
    const pageLen = Number(req.query.pageLen) // number of messages in one query action 
    
    // 3. query message via user_id and contact_id
    // 3.1 if pageLen != 0, get the last pageLen rows
    let sqlResult = []
    if (pageLen != 0) {
        sqlResult = await req.app.db.query(P2PMessage_Model.queryLastNrowsviaContactIdAndUserId(user_id,contact_id,pageLen));
    } else {
        // 3.2 if pageLen = 0, get the unread message only
        sqlResult = await req.app.db.query(P2PMessage_Model.queryUnreadMsgViaContactIdAndUserId(user_id,contact_id));
    }

    if (sqlResult.errorArray != 0){
        console.log('@P2PMessage_Handler.js : getListView', sqlResult.errorArray)
        data.message = '@P2PMessage_Handler.js getListView: ' + sqlResult.errorArray[0]
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return h.response(data).code(data.statusCode)
    }

    // 4. set the message status from unread to read
    const updateSqlResult = await req.app.db.query(P2PMessage_Model.updateMssageStatusToRead(user_id,contact_id));

    if (updateSqlResult.errorArray != 0){
        console.log('@P2PMessage_Handler.js : getListView', updateSqlResult.errorArray)
        data.message = '@P2PMessage_Handler.js getListView: ' + updateSqlResult.errorArray[0]
        data.statusCode = httpStatus.BadRequest
        data.error = ['Bad request']
        return h.response(data).code(data.statusCode)
    }

    // 5. return Contact id to frontend 
    data.message = '@P2PMessage_Handler.js : getListView , get unread message list ok' ;
    data.querySet = sqlResult.querySet ;
    data.statusCode = httpStatus.OK ;
    data.error = [] ;

    return h.response(data).code(data.statusCode)
}



exports.P2PMessage_Handler = P2PMessage_Handler ;