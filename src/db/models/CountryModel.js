const mysql = require("../connection");

class Country {
    constructor(country) {
        if (country) {
            this.id = country.id;
            this.name = country.name;
        } else {
            this.id = -1;
            this.name = "";
        }
    }

    getAll = (result) => {
        let sql = "select * from country;";
    
        mysql.query(sql, (err, resp) => {
            if (err) {
                console.log("get all countries ERROR: " + err);
                result(null, err);
                return err;
            }
    
            result(null, resp);
        });
    };

    findById = (id, result) => {
        mysql.query("select * from country where id = ?;", id, (err, resp) => {
            if (err) {
                console.log("get country by id (%s) ERROR: " + err, id);
                result(null, err);
                return err;
            }
    
            result(null, resp);
        });
    };
}

module.exports = Country;