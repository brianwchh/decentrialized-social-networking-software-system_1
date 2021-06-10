'use strict'

/**Subscription_Model : 
 * id: nt primary key auto_increment 
 * title: varchar(1024)not null UNIQUE,
 * content: text DEFAULT null 
 */

 const Subscription_Model = {

 }


Subscription_Model.checkBlogTable = 'SHOW TABLES LIKE "Subscription_Model";'


Subscription_Model.createBlogTable = `CREATE TABLE IF NOT EXISTS Subscription_Model(
    id int primary key auto_increment,
    api_url varchar(512) not null UNIQUE,
    user_id   int,
    
    CONSTRAINT Subscription_User_fk FOREIGN KEY(user_id) REFERENCES User_Model(id)
    ON DELETE RESTRICT 
    
)`;


Subscription_Model.createNewSubscription =  (api_url,user_id) => {
    
    return `INSERT INTO
            Subscription_Model
            (api_url,user_id)
            VALUES
            ('${api_url}',${user_id})`;

}

Subscription_Model.getSubscriptionList =  () => {
    
    return `SELECT * 
            FROM Subscription_Model
            `;

}

exports.Subscription_Model = Subscription_Model ;