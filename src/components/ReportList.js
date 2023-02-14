import React from "react";
// import { Typeahead } from 'react-bootstrap-typeahead';
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ReportList = (props) => {
    return (
        <div className="container">
            <div className="row">
                <Table className="hw-100" bordered>
                    <tbody>
                        <tr>
                            <td>
                                <b>Report Location:</b> {props.breadCrumb}
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div className="row">
                <Table className="hw-100" striped bordered hover>
                    <thead>
                        <tr>
                            <th>Author</th>
                            <th>Date</th>
                            <th>Place</th>
                            <th className="report-body">Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!props.reports || props.reports.length === 0 ? (
                            <tr key='0'>
                                <td className="no-data-report" colSpan={4}>
                                    No reports available
                                </td>
                            </tr>
                        ) : (
                            props.reports.map((report) => (
                                <tr key={report.id}>
                                    <td>{report.author}</td>
                                    <td>{report.post_date}</td>
                                    <td>
                                        {report.spot_name}, {report.water_name}
                                    </td>
                                    <td className="report-body" dangerouslySetInnerHTML={{__html: report.body}}></td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default ReportList;
