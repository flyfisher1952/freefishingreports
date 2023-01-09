import React from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";

const Reports = () => {
    return (
        <div className="container">
            <div className="row">
                <Table className="hw-100" bordered>
                    <tbody>
                        <tr>
                            <td>
                                <b>Report Location:</b> USA - Idaho - Bear River
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div className="row">
                <Table className="hw-100" striped bordered hover>
                    <thead>
                        <th>Date</th>
                        <th>Place</th>
                        <th>Report</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>20 Jun 22</td>
                            <td>Oneida Narrows</td>
                            <td>Great fishing on blue wing olives; nymphs early, emergers and adults at mid-day.</td>
                        </tr>
                        <tr>
                            <td>20 Jun 22</td>
                            <td>Oneida Narrows</td>
                            <td>Great fishing on blue wing olives; nymphs early, emergers and adults at mid-day.</td>
                        </tr>
                        <tr>
                            <td>20 Jun 22</td>
                            <td>Oneida Narrows</td>
                            <td>Great fishing on blue wing olives; nymphs early, emergers and adults at mid-day.</td>
                        </tr>
                        <tr>
                            <td>20 Jun 22</td>
                            <td>Oneida Narrows</td>
                            <td>Great fishing on blue wing olives; nymphs early, emergers and adults at mid-day.</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default Reports;
