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

    const validatePassword = (pw) => {
        let isValid = pw.length >= 8;
        setIsValidPassword(isValid);

        return isValid;
    };

    const validateEmail = (em) => {
        let isValid = emailRe.test(em);
        console.log("---> validateEmail.emailRe.test(email): " + emailRe.test(em));

        setIsValidEmail(isValid);
        return isValid;
    };

    const validateUsername = (un) => {
        let isValid = true;
        if (un.length >= 6 && usernameRe.test(un)) {
            async function fetchUsertname(un) {
                try {
                    const response = await fetch("http://localhost:3033/user/name/" + un);
                    const user = await response.json();

                    console.log("---> validateUsername.response.json: " + JSON.stringify(user));
                    isValid = !Object.hasOwn(user, "username");
                    setIsValidUsername(isValid);
                } catch (err) {
                    console.error(err);
                    isValid = false;
                    setIsValidUsername(isValid);
                }
            }
        }

        return isValid;
    };

    const validatePostalCode = (pc) => {
        let isValid = postalCode.length > 4;

        setIsValidPostalCode(isValid);
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
        console.log("--------------------------------------------------------------------");
        console.log("---> selectedCountry: " + JSON.stringify(selectedCountry));
        console.log("---> country_id: " + selectedCountry.country[0].id);
        console.log("---> body: " + body);
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
                                        className={"form-control user-input" + !{ isValidUsername } ? " invalid-input" : ""}
                                        type="text"
                                        value={username}
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                        }}
                                        onBlur={(e) => {
                                            validateUsername(username);
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
                                            setPassword(e.target.value);
                                        }}
                                    ></input>
                                </td>
                                <td>
                                    <FontAwesomeIcon icon={faCircleQuestion} />
                                </td>
                            </tr>
                            <tr>
                                <td className="dd-label-cell">
                                    <h6>Email: </h6>
                                </td>
                                <td>
                                    <input
                                        className={"form-control user-input" + !{ isValidEmail } ? " invalid-input" : ""}
                                        type="text"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                        onBlur={(e) => {
                                            validateEmail(email);
                                        }}
                                        data-lpignore="true"
                                    ></input>
                                </td>
                                <td>
                                    <FontAwesomeIcon icon={faCircleQuestion} />
                                </td>
                            </tr>
                            <tr>
                                <td className="dd-label-cell">
                                    <h6>Country: </h6>
                                </td>
                                <td>
                                    <AsyncTypeahead
                                        id="country-typeahead"
                                        className="user-input-dropdown"
                                        isLoading={isLoadingCountries}
                                        labelKey={(option) => `${option.name}`}
                                        onSearch={getCountries}
                                        options={dbCountries}
                                        onChange={(country) => {
                                            setSelectedCountry({ country });
                                        }}
                                        data-lpignore="true"
                                    />
                                </td>
                                <td>
                                    <FontAwesomeIcon icon={faCircleQuestion} />
                                </td>
                            </tr>
                            <tr>
                                <td className="dd-label-cell">
                                    <h6>Zip/Postal Code: </h6>
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
                                    <FontAwesomeIcon icon={faCircleQuestion} />
                                </td>
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
    );
};

export default Register;
