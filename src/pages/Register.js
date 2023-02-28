/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import Adds from "../components/Adds";
import SolunarDay from "../components/SolunarDay";
import { Button, OverlayTrigger, Table, Popover, PopoverBody } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./../icons.css";

const Register = () => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [dbCountries, setDbCountries] = useState([]);
    const [email, setEmail] = useState("");
    const [isLoadingCountries, setIsLoadingCountries] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isValidPostalCode, setIsValidPostalCode] = useState(true);
    const [isValidUsername, setIsValidUsername] = useState(true);
    const [password, setPassword] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [selectedCountry, setSelectedCountry] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState("");
    const [username, setUsername] = useState("");

    const usernameRe = new RegExp("/^[a-zA-Z]+[\\w\\d_\\-\\.]*$/");
    const emailRe = new RegExp("([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})");

    async function getCountries() {
        setIsLoadingCountries(true);

        const response = await fetch("http://localhost:3033/country");
        const json = await response.json();

        setDbCountries(json);
        setIsLoadingCountries(false);
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const validateUsername = async (un) => {
        if (un !== "" && un.length < 6) {
            setIsValidUsername(false);
        } else if (un !== "" && un.length >= 6 && usernameRe.test(un)) {
            try {
                const response = await fetch("http://localhost:3033/user/name/" + un);
                const user = await response.json();

                console.log("---> validateUsername.response.json: " + JSON.stringify(user));
                setIsValidUsername(!Object.hasOwn(user, "username"));
            } catch (err) {
                console.error(err);
                console.error("---> validateUsername.username: NOT VALID");
                setIsValidUsername(false);
            }
        }
    };

    const validatePassword = (pw) => {
        let isValid = true;

        if (pw !== "") {
            isValid = pw.length >= 8;
            setIsValidPassword(isValid);
        }

        return isValid;
    };

    const validateEmail = (em) => {
        let isValid = emailRe.test(em);

        if (em !== "") {
            isValid = emailRe.test(em);
            setIsValidEmail(isValid);
        }

        return isValid;
    };

    const validatePostalCode = (pc) => {
        let isValid = true;

        if (pc !== "") {
            isValid = postalCode.length > 4;
            setIsValidPostalCode(isValid);
        }

        return isValid;
    };

    const enableButton = () => {
        let isDisabled = !(isValidUsername && isValidPassword && isValidEmail && Object.hasOwn(selectedCountry, "country") && isValidPostalCode);

        setIsButtonDisabled(isDisabled);
    };

    const register = async () => {
        const user = {
            username: username,
            email: email,
            country_id: selectedCountry.country[0].id,
            postal_code: postalCode,
            password: password,
        };
        const body = JSON.stringify(user);
        const response = await fetch("http://localhost:3033/user", {
            method: "POST",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: body,
        });
        const responseObject = await response.json();

        // if (response.status === 200 && responseObject.affectedRows === 1) {
        //     setStatus("Report Submitted successfully.");
        // } else {
        //     setStatus("Report Submition Failed.");
        // }
    };

    useEffect(() => {
        validateEmail(email);
        validateUsername(username);
        validatePassword(password);
        validatePostalCode(postalCode);
        enableButton();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username, password, email, selectedCountry, postalCode]);

    return (
        <>
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
                                        <h6 className={isValidUsername ? "valid-input" : "invalid-input"}>Username: </h6>
                                    </td>
                                    <td>
                                        <input
                                            className={"form-control user-input"}
                                            type="text"
                                            value={username}
                                            labelKey={(option) => `${option.name}`}
                                            onChange={(e) => setUsername(e.target.value)}
                                            onBlur={(e) => validateUsername(e.target.value)}
                                            data-lpignore="true"
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
                                            <FontAwesomeIcon icon={faCircleQuestion} />
                                        </OverlayTrigger>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="dd-label-cell">
                                        <h6 className={isValidPassword ? "valid-input" : "invalid-input"}>Password: </h6>
                                    </td>
                                    <td>
                                        <input
                                            className="form-control user-input"
                                            type="password"
                                            value={password}
                                            labelKey={(option) => `${option.name}`}
                                            onChange={(e) => setPassword(e.target.value)}
                                            data-lpignore="true"
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
                                                        Passwords must be at least 8 characters long, have no embedded spaces and must include at least one of
                                                        the following; UPPERCASE and lowercase letters, numbers and special characters like '%$#@!~_-'.
                                                    </PopoverBody>
                                                </Popover>
                                            }
                                        >
                                            <FontAwesomeIcon icon={faCircleQuestion} />
                                        </OverlayTrigger>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="dd-label-cell">
                                        <h6 className={isValidEmail ? "valid-input" : "invalid-input"}>Email: </h6>
                                    </td>
                                    <td>
                                        <input
                                            className={"form-control user-input"}
                                            type="text"
                                            value={email}
                                            labelKey={(option) => `${option.name}`}
                                            onChange={(e) => setEmail(e.target.value)}
                                            data-lpignore="true"
                                        ></input>
                                    </td>
                                    <td>
                                        <OverlayTrigger
                                            trigger="click"
                                            key="email-info-overlay"
                                            placement="right"
                                            overlay={
                                                <Popover id="email-info-popover">
                                                    <PopoverBody>
                                                        A valid email address is required and will be verified by sending you an email to which you are required
                                                        to respond.
                                                    </PopoverBody>
                                                </Popover>
                                            }
                                        >
                                            <FontAwesomeIcon icon={faCircleQuestion} />
                                        </OverlayTrigger>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="dd-label-cell">
                                        <h6 className={selectedCountry ? "valid-input" : "invalid-input"}>Country: </h6>
                                    </td>
                                    <td>
                                        <AsyncTypeahead
                                            id="country-typeahead"
                                            className="form-control user-input-dropdown"
                                            isLoading={isLoadingCountries}
                                            onSearch={getCountries}
                                            options={dbCountries}
                                            onChange={(country) => setSelectedCountry({ country })}
                                            data-lpignore="true"
                                        />
                                    </td>
                                    <td>
                                        <OverlayTrigger
                                            trigger="click"
                                            key="country-info-overlay"
                                            placement="right"
                                            overlay={
                                                <Popover id="country-info-popover">
                                                    <PopoverBody>
                                                        Your country is required so that we can show you the appropriate Solunar forecast from 
                                                        <a href="https://solunarforecast.com/solunarcalendar.aspx/">SolunarForecast.com</a>.
                                                    </PopoverBody>
                                                </Popover>
                                            }
                                        >
                                            <FontAwesomeIcon icon={faCircleQuestion} />
                                        </OverlayTrigger>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="dd-label-cell">
                                        <h6 className={isValidPostalCode ? "valid-input" : "invalid-input"}>Zip/Postal Code: </h6>
                                    </td>
                                    <td>
                                        <input
                                            className="form-control user-input"
                                            type="text"
                                            value={postalCode}
                                            onChange={(e) => {
                                                setPostalCode(e.target.value);
                                            }}
                                            data-lpignore="true"
                                        ></input>
                                    </td>
                                    <td>
                                        <OverlayTrigger
                                            trigger="click"
                                            key="postalCode-info-overlay"
                                            placement="right"
                                            overlay={
                                                <Popover id="postalCode-info-popover">
                                                    <PopoverBody>
                                                        Your postal code is required so that we can show you the appropriate Solunar forecast from 
                                                        <a href="https://solunarforecast.com/solunarcalendar.aspx/">SolunarForecast.com</a>.
                                                    </PopoverBody>
                                                </Popover>
                                            }
                                        >
                                            <FontAwesomeIcon icon={faCircleQuestion} />
                                        </OverlayTrigger>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>{status}</td>
                                </tr>
                                <tr>
                                    <td>&nbsp;</td>
                                    <td className="float-right">
                                        <Button variant="success" disabled={isButtonDisabled} onClick={register}>
                                            Register
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
        </>
    );
};

export default Register;
