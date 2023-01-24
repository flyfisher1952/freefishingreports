const mysql = require("../connection");

class Report {
    constructor(report) {
        if (report) {
            this.id = report.id;
            this.date = report.date;
            this.body = report.body;
            this.water_id = report.water_id;
            this.spot_id = report.spot_id;
            this.is_deleted = false;
        } else {
            this.id = -1;
            this.date = "";
            this.body = "";
            this.water_id = null;
            this.spot_id = null;
            this.is_deleted = false;
        }
    }

    create = (report, result) => {
        mysql.query(`insert into report set ?;`, report, (err, resp) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            result(null, resp);
        });
    };

    getAll = (result) => {
        mysql.query("select * from report;", (err, resp) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            result(null, resp);
        });
    };

    getPage = (page_number, row_count, result) => {
        let offset = page_number > 0 ? (page_number - 1) * row_count : 0;
        let sql = "select * from report order by post_date limit " + offset + "," + row_count + ";";

        mysql.query(sql, (err, resp) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            result(null, resp);
        });
    };

    findById = (id, result) => {
        mysql.query("select * from report where id = ?;", id, (err, resp) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            result(null, resp);
        });
    };

    findByStateId = (state_id, result) => {
        const sql = `select 
                        s.country_code,
                        s.name as state_name,
                        w.name as water_name,
                        r.body,
                        r.post_date
                    from
                        report r
                            join state_water sw ON r.water_id = sw.water_id
                            join state s ON sw.state_id = s.id
                            join water w ON sw.water_id = w.id
                    where
                        sw.state_id = ?
                    order by w.name, post_date desc;`;

        mysql.query(sql, state_id, (err, resp) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            result(null, resp);
        });
    };

    findByWaterId = (water_id, result) => {
        const sql = `select 
                        s.country_code,
                        s.name as state_name,
                        w.name as water_name,
                        r.body,
                        r.post_date
                    from
                        report r
                            join state_water sw on r.water_id = sw.water_id
                            join water w on sw.water_id = w.id
                            join state s on sw.state_id = s.id
                    where
                        r.water_id = ?
                    order by post_date desc;`;

        mysql.query(sql, water_id, (err, resp) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            result(null, resp);
        });
    };

    findBySpotId = (spot_id, result) => {
        const sql = `select 
                        s.country_code,
                        s.name as state_name,
                        w.name as water_name,
                        sp.name as spot_name,
                        r.body,
                        r.post_date
                    from
                        report r
                            join state_water sw ON r.water_id = sw.water_id
                            join water w on sw.water_id = w.id
                            join state s ON sw.state_id = s.id
                            join spot sp on w.id = sp.water_id
                    where
                        sp.id = 3
                    order by w.name, sp.name, post_date desc;`;

        mysql.query(sql, spot_id, (err, resp) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            result(null, resp);
        });
    };

    update = (report, result) => {
        mysql.query("update report set ? where id = ?;", [report, report.id], (err, resp) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            result(null, resp);
        });
    };

    delete = (id, result) => {
        mysql.query("update report set is_deleted = 1 where id = ?;", id, (err, resp) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            result(null, resp);
        });
    };
}

module.exports = Report;
