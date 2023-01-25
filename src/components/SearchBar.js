/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { UseFetchCountries, UseFetchStates, UseFetchWaters } from "./hooks/SearchBarHooks";

const SearchBar = () => {
    const COUNTRY_DD_TITLE = "Select a Country";
    const STATE_DD_TITLE = "Select a State/Region";
    const WATER_DD_TITLE = "Select the water you fished";

    const [countryDropdownTitle, setCountryDropDownTitle] = useState(COUNTRY_DD_TITLE);
    const [selectedCountryId, setSelectedCountryId] = useState(0);

    const [selectedStateTitle, setSelectedStateTitle] = useState(STATE_DD_TITLE);
    const [selectedStateId, setSelectedStateId] = useState(0);
    const [stateItems, setStateItems] = useState();

    const [waterDropdownTitle, setWaterDropdownTitle] = useState(WATER_DD_TITLE);
    const [selectedWaterId, setSelectedWaterId] = useState(0);
    const [isLoadingWaters, setIsLoadingWaters] = useState(true);
    const [waterItems, setWaterItems] = useState();

    const [dbCountries, isLoadingCountries] = UseFetchCountries("http://localhost:3033/country");
    const [dbStates, isLoadingStates] = UseFetchStates("http://localhost:3033/state");
    const [dbWaters, setDbWaters] = useState([]);

    const setStateDropdownItems = (id) => {
        let countryStates = dbStates.filter((s) => {
            return s.country_id == id;
        });

        setStateItems(
            countryStates.map((state) => (
                <Dropdown.Item key={state.id} eventKey={state.id} value={state}>
                    {state.name}
                </Dropdown.Item>
            ))
        );
    };

    const setWaterDropdownItems = () => {
        setWaterItems(
            dbWaters.map((water) => (
                <Dropdown.Item key={water.id} eventKey={water.id} value={water}>
                    {water.name}
                </Dropdown.Item>
            ))
        );
    };

    useEffect(() => {}, []);

    const selectCountryHandler = (id, evt) => {
        setSelectedCountryId(id);
        setCountryDropDownTitle(evt.target.textContent);
        setSelectedStateId(0);
        setStateDropdownItems(id);
    };

    const selectStateHandler = (id, evt) => {
        setSelectedStateId(id);
        setSelectedStateTitle(evt.target.textContent);
        console.log("===> ID: " + id);
        getStateWaters(id);
    };

    const selectWaterHandler = (id, evt) => {
        setSelectedWaterId(id);
        setWaterDropdownTitle(evt.target.textContent);
    };

    const getStateWaters = (id) => {
        const URL = "http://localhost:3033/water/state" + (id ? "/" + id : "/");

        async function fetchWaters() {
            const response = await fetch(URL);
            const json = await response.json();

            console.log("===> dbWaters: " + JSON.stringify(json));
            setDbWaters(json);
            dbWaters.forEach((water) => {
                console.log("===> water: " + JSON.stringify(water));
            });
            setIsLoadingWaters(false);
            setWaterDropdownItems();
        }

        fetchWaters();
    };

    return (
        <div className="container-fluid h-100">
            <div className="row bordered-component">
                <h3>Select your filters</h3>
                <div className="row">
                    {isLoadingCountries ? (
                        <h6>Loading...</h6>
                    ) : (
                        <DropdownButton variant="light" title={countryDropdownTitle} onSelect={selectCountryHandler}>
                            {dbCountries.map((country) => (
                                <Dropdown.Item key={country.id} eventKey={country.id} value={country.name}>
                                    {country.name}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                    )}
                </div>
                <div className="row">
                    {selectedCountryId > 0 && !isLoadingStates && (
                        <DropdownButton variant="light" title={selectedStateTitle} onSelect={selectStateHandler}>
                            {stateItems}
                        </DropdownButton>
                    )}
                </div>
                <div className="row">
                    {selectedStateId > 0 && (
                        <DropdownButton variant="light" title={waterDropdownTitle} onSelect={selectWaterHandler}>
                            {waterItems}
                        </DropdownButton>
                    )}
                </div>
                <div className="row"></div>
            </div>
        </div>
    );
};

export default SearchBar;
