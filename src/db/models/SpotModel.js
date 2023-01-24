const mysql = require("../connection");

class Spot {
    constructor(spot) {
        if (spot) {
            this.id = spot.id;
            this.name = spot.name;
            this.water_id = spot.water_id;
            this.is_deleted = false;
        } else {
            this.id = -1;
            this.name = "";
            this.water_id = null;
            this.is_deleted = false;
        }
    }

    create = (data, result) => {
        mysql.query(
            `insert into spot 
                (name, water_id, is_deleted) 
            values (?, ?, ?);`,
            [data.name, data.water_id, data.is_deleted],
            (err, resp) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }

                result(null, resp);
            }
        );
    };

    getAll = (result) => {
        mysql.query("select * from spot;", (err, resp) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            result(null, resp);
        });
    };

    findById = (id, result) => {
        mysql.query(`select * from spot where id = ?;`, id, (err, resp) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            result(null, resp);
        });
    };

    findByWaterId = (water_id, result) => {
        mysql.query(`select * from spot where water_id = ?;`, water_id, (err, resp) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            result(null, resp);
        });
    };

    update = (spot, result) => {
        mysql.query("update spot set ? where id = ?;", [spot, spot.id], (err, resp) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            result(null, resp);
        });
    };

    delete = (id, result) => {
        mysql.query("update spot set is_deleted = 1 where id = ?;", id, (err, resp) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            result(null, resp);
        });
    };
}

module.exports = Spot;
