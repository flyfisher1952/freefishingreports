/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Table } from "react-bootstrap";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";

const SearchBar = (props) => {
    const [dbCountries, setDbCountries] = useState([]);
    const [dbStates, setDbStates] = useState([]);
    const [dbWaters, setDbWaters] = useState([]);
    const [dbSpots, setDbSpots] = useState([]);

    const [selectedCountry, setSelectedCountry] = useState({});
    const [selectedState, setSelectedState] = useState({});
    const [selectedWater, setSelectedWater] = useState({});
    const [selectedSpot, setSelectedSpot] = useState({});

    const [isLoadingCountries, setIsLoadingCountries] = useState(true);
    const [isLoadingStates, setIsLoadingStates] = useState(true);
    const [isLoadingWaters, setIsLoadingWaters] = useState(true);
    const [isLoadingSpots, setIsLoadingSpots] = useState(true);

    const [buttonDisabled, setButtonDisabled] = useState(true);

    async function getCountries() {
        setIsLoadingCountries(true);

        const response = await fetch("http://localhost:3033/country");
        const json = await response.json();

        setDbCountries(json);
        setIsLoadingCountries(false);
    }

    async function getStates() {
        setIsLoadingStates(true);
        console.log("---> SearchBar > getStates > selectedCountry: " + JSON.stringify(selectedCountry));
        console.log("---> SearchBar > getStates > selectedCountry.id: " + JSON.stringify(selectedCountry.country[0].id));

        const url = "http://localhost:3033/state" + (selectedCountry.country[0]  ? "/country/" + selectedCountry.country[0].id : "");

        const response = await fetch(url);
        const json = await response.json();

        setDbStates(json);
        setIsLoadingStates(false);
    }

    async function getWaters() {
        const url = "http://localhost:3033/water" + (selectedState && selectedState.id ? "/state/" + selectedState.id : "");
        setIsLoadingWaters(true);

        const response = await fetch(url);
        const json = await response.json();

        setDbWaters(json);
        setIsLoadingWaters(false);
    }

    async function getSpots() {
        setIsLoadingSpots(true);
        const url = "http://localhost:3033/spot" + (selectedWater && selectedWater.id ? "/water/" + selectedWater.id : "");

        const response = await fetch(url);
        const json = await response.json();

        setDbSpots(json);
        setIsLoadingSpots(false);
    }

    const enableButton = () => {
        setButtonDisabled(
            selectedCountry && selectedCountry.id && selectedState && selectedState.id && selectedWater && selectedWater.id && selectedSpot && selectedSpot.id
        );
    };

    useEffect(() => {
        enableButton();
    }, []);

    const buttonClickHandler = () => {
        console.log("===> SearchBar > buttonClickHandler > spot: " + JSON.stringify(selectedSpot));

        if (props.searchButtonClick) {
            props.searchButtonClick(selectedSpot);
        }
    };

    return (
        <div className="container-fluid h-100">
            <div className="row bordered-component">
                <h4>Select your filters</h4>
                <Table className="table search-bar-filter">
                    <tbody>
                        <tr>
                            <td className="dd-label-cell">
                                <h6>Country: </h6>
                            </td>
                            <td>
                                <AsyncTypeahead
                                    id="country-typeahead"
                                    isLoading={isLoadingCountries}
                                    labelKey={(option) => `${option.name}`}
                                    onSearch={getCountries}
                                    options={dbCountries}
                                    onChange={(country) => {
                                        setSelectedCountry({ country });
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="dd-label-cell">
                                <h6>State/Region: </h6>
                            </td>
                            <td>
                                <AsyncTypeahead
                                    id="state-typeahead"
                                    isLoading={isLoadingStates}
                                    labelKey={(option) => `${option.name}`}
                                    onSearch={getStates}
                                    options={dbStates}
                                    onChange={(state) => {
                                        setSelectedState({ state });
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="dd-label-cell">
                                <h6>Water: </h6>
                            </td>
                            <td>
                                <AsyncTypeahead
                                    id="water-typeahead"
                                    isLoading={isLoadingWaters}
                                    labelKey={(option) => `${option.name}`}
                                    onSearch={getWaters}
                                    options={dbWaters}
                                    onChange={(water) => {
                                        setSelectedWater({ water });
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="dd-label-cell">
                                <h6>Spot: </h6>
                            </td>
                            <td>
                                <AsyncTypeahead
                                    id="spot-typeahead"
                                    isLoading={isLoadingSpots}
                                    labelKey={(option) => `${option.name}`}
                                    onSearch={getSpots}
                                    options={dbSpots}
                                    onChange={(spot) => {
                                        setSelectedSpot({ spot });
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td>
                                <Button className="float-right" variant="success" disabled={buttonDisabled} onClick={buttonClickHandler}>
                                    Get Reports
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default SearchBar;
