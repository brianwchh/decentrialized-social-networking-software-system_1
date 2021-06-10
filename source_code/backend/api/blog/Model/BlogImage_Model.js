'use strict'

/**BlogImage_Model : 
 * id: int primary key auto_increment 
 * url: varchar(2048)not null,
 * blogId: int not null
 */

 const BlogImage_Model = {

 }

 BlogImage_Model.createBlogImageTable = `CREATE TABLE IF NOT EXISTS BlogImg
    id int primary key auto_increment,
    url: varchar(2048)not null ,
    blogId: int not null

    CONSTRAINT blogId_fk FOREIGN KEY (blogId) REFERENCES Blog(id)
    ON DELETE CASCADE 
)`;


exports.BlogImage_Model = BlogImage_Model ;