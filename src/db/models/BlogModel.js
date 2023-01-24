const mysql = require("../connection");

class Blog {
    constructor(blog) {
        if (blog) {
            this.id = blog.id;
            this.author = blog.author;
            this.body = blog.body;
            this.created_date = bloc.created_date;
            this.is_deleted = blog.is_deleted;
        }
    }
    
    getAll = (result) => {
        let sql = "select * from blog order by created_date;";
    
        mysql.query(sql, (err, resp) => {
            if (err) {
                console.log("get all blog entries ERROR: " + err);
                result(null, err);
                return err;
            }
    
            result(null, resp);
        });
    };

    getPage = (page_number, row_count, result) => {
        let offset = page_number > 0 ? (page_number - 1) * row_count : 0;
        let sql = "select * from blog order by created_date limit " + offset + "," + row_count + ";";

        mysql.query(sql, (err, resp) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            result(null, resp);
        });
    };
}

module.exports = Blog;
