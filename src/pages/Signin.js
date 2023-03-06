/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Adds from "../components/Adds";
import SolunarDay from "../components/SolunarDay";
import { Button, OverlayTrigger, Table, Popover, PopoverBody } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";

const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, SetPassword] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [status, setStatus] = useState("");

    const signIn = async () => {
        const credentials = {
            username: username,
            password: password,
        };
        const body = JSON.stringify(credentials);
        const response = await fetch("http://localhost:3033/user/signin", {
            method: "POST",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: body,
        });
        const responseObject = await response.json();
        // const navigate = useNavigate();

        console.log("---> Signin.signIn: response %s", JSON.stringify(responseObject));

        if (response.status === 200 && responseObject.result_message === "OK") {
            setStatus("Report Submitted successfully.");
        } else {
            setStatus("Report Submition Failed.");
        }
    };

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
                <div className="col-3 bordered-component">
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
                                    <OverlayTrigger
                                        trigger="click"
                                        key="username-info-overlay"
                                        placement="right"
                                        overlay={
                                            <Popover id="username-info-popover">
                                                <PopoverBody>
                                                    Usernames must be unique, at least 6 characters long, start with a letter (upper or lower case), and can
                                                    only have letters and numbers.
                                                </PopoverBody>
                                            </Popover>
                                        }
                                    >
                                        <FontAwesomeIcon icon={faCircleQuestion} className="cursor-pointer" />
                                    </OverlayTrigger>
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
                                    <OverlayTrigger
                                        trigger="click"
                                        key="password-info-overlay"
                                        placement="right"
                                        overlay={
                                            <Popover id="password-info-popover">
                                                <PopoverBody>
                                                    Passwords must be at least 8 characters long, have no embedded spaces and must include at least one of the
                                                    following; UPPERCASE and lowercase letters, numbers and special characters like '%$#@!~_-'.
                                                </PopoverBody>
                                            </Popover>
                                        }
                                    >
                                        <FontAwesomeIcon icon={faCircleQuestion} className="cursor-pointer" />
                                    </OverlayTrigger>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <Table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <span className="status-message">{status}</span>
                                                </td>
                                                <td className="float-right">
                                                    <Button variant="success" disabled={buttonDisabled} onClick={signIn}>
                                                        Sign In
                                                    </Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
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
