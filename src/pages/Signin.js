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
    const [email, setEmail] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [buttonText, setButtonText] = useState("Sign In");
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [dbCountries, setDbCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState({});
    const [isLoadingCountries, setIsLoadingCountries] = useState(true);

    async function getCountries() {
        setIsLoadingCountries(true);

        const response = await fetch("http://localhost:3033/country");
        const json = await response.json();

        setDbCountries(json);
        setIsLoadingCountries(false);
    }

    const isValidEmail = () => {};

    const enableButton = () => {
        let isDisabled = !(username.length >= 4 && password.length >= 8 && isValidEmail(email) && postalCode.length > 4);

        setButtonDisabled(isDisabled);
    };

    const signIn = () => {};

    useEffect(() => {
        enableButton();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username, password, email, postalCode]);

    return (
        <div className="container-fluid">
            <div className="row justify-content-between h-100">
                <div className="col-3">
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
                                        type="hidden"
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
                                <td className="dd-label-cell">
                                    <h6>Email: </h6>
                                </td>
                                <td>
                                    <input
                                        className="form-control user-input"
                                        type="text"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
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
                                    <Button variant="success" disabled={buttonDisabled} onClick={signIn}>
                                        {buttonText}
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className="col-3">
                    <Adds />
                </div>
            </div>
        </div>
    );
};

export default Signin;
