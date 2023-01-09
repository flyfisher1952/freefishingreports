import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, DropdownButton } from "react-bootstrap";

import countries from "./../countries.json";
import states from "./../states.json";

const SearchBar = () => {
    const COUNTRY_DD_TITLE = "Select a Country";
    const STATE_DD_TITLE = "Select a State/Region";

    const [countryDropdownTitle, setCountryDropDownTitle] = useState(COUNTRY_DD_TITLE);
    const [selectedCountryId, setSelectedCountryId] = useState(0);

    const [selectedStateTitle, setSelectedStateTitle] = useState(STATE_DD_TITLE);
    const [selectedStateId, setSelectedStateId] = useState(0);
    const [stateItems, setStateItems] = useState();

    const setStateDropdownItems = (id) => {
        let avail = states.filter((s) => {
            return s.country_id == id;
        });

        setStateItems(
            avail.map((state) => (
                <Dropdown.Item key={state.id} eventKey={state.id} value={state.name}>
                    {state.name}
                </Dropdown.Item>
            ))
        );
    };

    const selectCountryHandler = (id, evt) => {
        setSelectedCountryId(id);
        setCountryDropDownTitle(evt.target.textContent);
        setSelectedStateId(0);
        setStateDropdownItems(id);
    };

    const selectStateHandler = (id, evt) => {
        setSelectedStateId(id);
        setSelectedStateTitle(evt.target.textContent);
    };

    return (
    <div className="container-fluid h-100">
            <div className="row bordered-component">
                <h3>Select your filters</h3>
                <div className="row">
                    <DropdownButton variant="light" title={countryDropdownTitle} onSelect={selectCountryHandler}>
                        {countries.map((country) => (
                            <Dropdown.Item key={country.id} eventKey={country.id} value={country.name}>
                                {country.name}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                </div>
                <div className="row">
                    {selectedCountryId > 0 && (
                        <DropdownButton variant="light" title={selectedStateTitle} onSelect={selectStateHandler}>
                            {stateItems}
                        </DropdownButton>
                    )}
                </div>
                <div className="row">
                {selectedStateId > 0 && (
                        <DropdownButton variant="light" title={selectedStateTitle} onSelect={selectStateHandler}>
                            {stateItems}
                        </DropdownButton>
                    )}

                </div>
                <div className="row"></div>
            </div>
        </div>
    );
};

export default SearchBar;
