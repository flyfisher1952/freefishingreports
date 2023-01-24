const mysql = require("../connection");

class State {
    constructor(state) {
        if (state) {
            this.id = state.id;
            this.name = state.name;
            this.country_id = state.country_id;
            this.country_code = state.country_code;
            this.state_code = state.state_code;
            this.stateType = state.stateType;
            this.latitude = state.latitude;
            this.longitude = state.longitude;
        } else {
            this.id = -1;
            this.name = "";
            this.country_id = "";
            this.country_code = "";
            this.country_name = "";
            this.state_code = "";
            this.stateType = "";
            this.latitude = 0.0;
            this.longitude = 0.0;
        }
    }

    getAll = (result) => {
        mysql.query("select * from state", (err, resp) => {
            if (err) {
                console.log("get by country_id ERROR: " + err);
                result(null, err);
                return;
            }

            result(null, resp);
        });
    };

    findByCountryId = (id, result) => {
        mysql.query("select * from state where country_id = ?", id, (err, resp) => {
            if (err) {
                console.log("get by country_id ERROR: " + err);
                result(null, err);
                return;
            }

            result(null, resp);
        });
    };

    findById = (id, result) => {
        mysql.query("select * from state where id = ?", id, (err, resp) => {
            if (err) {
                console.log("get state by id (%s) ERROR: " + err, id);
                result(null, err);
                return;
            }

            result(null, resp);
        });
    };
}

module.exports = State;
