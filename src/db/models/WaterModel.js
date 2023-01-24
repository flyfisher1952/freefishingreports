const mysql = require("../connection");

const kinds = ["Ocean", "Sea", "Lake", "Pond", "River", "Stream"];

class Water {
    constructor(water) {
        if (water) {
            this.id = water.id;
            this.name = water.name;
            this.kind = water.kind;
        } else {
            this.id = null;
            this.name = null;
            this.kind = null;
        }
    }

    getKinds = (result) => {
        result(null, kinds);
    };

    create = (data, result) => {
        let new_id = 0;
        mysql.query(`call insert_water(?, ?, ?);`, [data.name, data.kind, data.state_id], (err, resp) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            result(null, resp);
        });
    };

    getAll = (result) => {
        mysql.query("select * from water;", (err, resp) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            result(null, resp);
        });
    };

    findById = (id, result) => {
        mysql.query("select * from water where id = ?;", id, (err, resp) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            result(null, resp);
        });
    };

    findByStateId = (state_id, result) => {
        const sql = `
            select 
                * 
            from 
                water w 
                join state_water sw on w.id = sw.water_id 
                join state s on sw.state_id = s.id 
            where 
                sw.state_id = ?;`;

        mysql.query(sql, state_id, (err, resp) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            result(null, resp);
        });
    };

    update = (data, result) => {
        mysql.query("update water set name = ?, kind = ? where id = ?;", [data.name, data.kind, data.id], (err, resp) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            result(null, resp);
        });
    };

    delete = (id, result) => {
        mysql.query("update water set is_deleted = 1 where id = ?;", id, (err, resp) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            result(null, resp);
        });
    };
}

module.exports = Water;
