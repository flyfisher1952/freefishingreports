const mysql = require("../connection");

class User {
    constructor(user) {
        if (user) {
            this.id = user.id;
            this.username = user.username;
            this.email = user.email;
            this.first_name = user.first_name;
            this.last_name = user.last_name;
            this.address1 = user.address1;
            this.address2 = user.address2;
            this.state_id = user.state_id;
            this.country_id = user.country_id;
            this.email_verified = user.email_verified;
        } else {
            this.id = 0;
            this.username = null;
            this.email = null;
            this.first_name = null;
            this.last_name = null;
            this.address1 = null;
            this.address2 = null;
            this.state_id = 0;
            this.country_id = 0;
            this.email_verified = 0;
            this.is_deleted = 0;
        }
    }

    create = (user, result) => {
        mysql.query(`insert into user set ?;`, user, (err, resp) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            result(null, resp);
        });
    };

    getAll = (req, result) => {
        mysql.query("select * from user;", (err, resp) => {
            if (err) {
                console.log("get all users ERROR: " + err);
                result(null, err);
                return;
            }

            result(null, resp);
        });
    };

    // TODO - add getPage method

    findById = (id, result) => {
        mysql.query("select * from user where id = ?;", id, (err, resp) => {
            if (err) {
                console.log("get user by id (%s) ERROR: " + err, id);
                return;
            }

            result(null, resp);
        });
    };

    update = (user, result) => {
        mysql.query(`update user set ? where id = ?;`, [user, user.id], (err, resp) => {
            if (err) {
                console.log("update user (%s) ERROR: " + err, user.username);
                result(null, err);
                return;
            }

            result(null, resp);
        });
    };

    delete = (id, result) => {
        mysql.query("update user set is_deleted = 1 where id = ?;", id, (err, resp) => {
            if (err) {
                console.log("delete user by id (%s) ERROR: " + err, id);
                return;
            }

            result(null, resp);
        });
    };
}

module.exports = User;
