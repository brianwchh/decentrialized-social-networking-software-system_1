'use strict'

/**Blog : 
 * id: nt primary key auto_increment 
 * title: varchar(1024)not null UNIQUE,
 * content: text DEFAULT null 
 */

 const Blog = {

 }


Blog.checkBlogTable = 'SHOW TABLES LIKE "Blog";'


Blog.createBlogTable = `CREATE TABLE IF NOT EXISTS Blog(
    id int primary key auto_increment,
    title varchar(1024) not null ,
    content TEXT 
)`;


Blog.createNewBlog =  (title, content) => {
    
    return `INSERT INTO
            Blog
            (title,content)
            VALUES
            ('${title}','${content}')`;

}

Blog.getBlog =  (id) => {
    
    return `SELECT * 
            FROM Blog
            WHERE id = ${id}
            `;

}

Blog.getBlogList =  () => {
    
    return `SELECT * 
            FROM Blog
            `;

}

exports.Blog = Blog ;