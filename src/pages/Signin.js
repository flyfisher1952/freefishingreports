/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import Adds from "../components/Adds";
import SolunarDay from "../components/SolunarDay";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";

const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, SetPassword] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const signIn = () => {};

    useEffect(() => {
        let isDisabled = !(username.length >= 4 && password.length >= 8);

        setButtonDisabled(isDisabled);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username, password]);

    return (
        <div className="container-fluid">
            <div className="row justify-content-between">
                <div className="col-2">
                    <SolunarDay />
                </div>
                <div className="col-3 shadow p-3 mb-5 bg-white rounded">
                    <Table>
                        <tbody>
                            <tr>
                                <td className="dd-label-cell">
                                    <h6>Username: </h6>
                                </td>
                                <td>
                                    <input
                                        className="form-control user-input"
                                        type="text"
                                        value={username}
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                        }}
                                    ></input>
                                </td>
                                <td>
                                    <FontAwesomeIcon icon={faCircleQuestion} />
                                </td>
                            </tr>
                            <tr>
                                <td className="dd-label-cell">
                                    <h6>Password: </h6>
                                </td>
                                <td>
                                    <input
                                        className="form-control user-input"
                                        type="password"
                                        value={password}
                                        onChange={(e) => {
                                            SetPassword(e.target.value);
                                        }}
                                    ></input>
                                </td>
                                <td>
                                    <FontAwesomeIcon icon={faCircleQuestion} />
                                </td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td className="float-right">
                                    <Button variant="success" disabled={buttonDisabled} onClick={signIn}>
                                        Sign In
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className="col-2">
                    <Adds />
                </div>
            </div>
        </div>
    );
};

export default Signin;
