'use strict'

/**Blog_Model : 
 * id: nt primary key auto_increment 
 * title: varchar(1024)not null UNIQUE,
 * content: text DEFAULT null 
 */

 const Blog_Model = {

 }


Blog_Model.checkBlogTable = 'SHOW TABLES LIKE "Blog_Model";'


Blog_Model.createBlogTable = `CREATE TABLE IF NOT EXISTS Blog_Model(
    id int primary key auto_increment,
    title varchar(1024) not null ,
    content TEXT ,
    user_id   int,
    createdAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT Blog_User_fk FOREIGN KEY(user_id) REFERENCES User_Model(id)
    ON DELETE RESTRICT 
    
)`;


Blog_Model.createNewBlog =  (title, content,user_id) => {
    
    return `INSERT INTO
            Blog_Model
            (title,content,user_id)
            VALUES
            ('${title}','${content}',${user_id})`;

}

Blog_Model.getBlogDetail =  (id) => {
    
    return `SELECT * 
            FROM Blog_Model
            WHERE id = ${id}
            `;

}

Blog_Model.getBlogList =  () => {
    
    return `SELECT * 
            FROM Blog_Model
            ORDER BY createdAt DESC
            `;

}

Blog_Model.deleteBlog = (id) => {

    return `DELETE 
            FROM Blog_Model
            WHERE id=${id}`;

}

Blog_Model.updateBlog = (id,title,content) => {

    return `UPDATE Blog_Model
                SET title = '${title}', content = '${content}'
                WHERE id = ${id};`

}

Blog_Model.getLastBlog =  () => {
    
    return `SELECT * 
            FROM Blog_Model
            ORDER BY id DESC LIMIT 1
            `;

}

exports.Blog_Model = Blog_Model ;