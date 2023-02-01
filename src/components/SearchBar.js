/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import { UseFetchCountries, UseFetchStates, UseFetchWaters, UseFetchSpots } from "./hooks/SearchBarHooks";
import TypeAheadDropDown from "./Typeaheads/TypeAheadDropDown";

const SearchBar = (props) => {
    const dbCountries = UseFetchCountries("http://localhost:3033/country");
    const dbStates = UseFetchStates("http://localhost:3033/state");
    const dbWaters = UseFetchWaters("http://localhost:3033/water");
    const dbSpots = UseFetchSpots("http://localhost:3033/spot");

    const [availableStates, setAvailableStates] = useState(dbStates);
    const [availableWaters, setAvailableWaters] = useState(dbWaters);
    const [availableSpots, setAvailableSpots] = useState(dbSpots);

    const [selectedCountry, setSelectedCountry] = useState({});
    const [selectedState, setSelectedState] = useState({});
    const [selectedWater, setSelectedWater] = useState({});
    const [selectedSpot, setSelectedSpot] = useState({});

    const [buttonDisabled, setButtonDisabled] = useState(true);

    const selectCountryHandler = (country) => {
        setSelectedCountry(country);
        setAvailableStates(dbStates.filter((state) => state.country_id == country.id));
        setButtonDisabled(true);
    };

    const selectStateHandler = (state) => {
        setSelectedState(state);
        setAvailableWaters(dbWaters.filter((water) => state.id == water.state_id));
        setButtonDisabled(true);
    };

    const selectWaterHandler = (water) => {
        setSelectedWater(water);
        setButtonDisabled(true);
    };

    const selectSpotHandler = (spot) => {
        setSelectedSpot(spot);
        setButtonDisabled(false);
    };

    const buttonClickHandler = () => {
        console.log("===> SearchBar > buttonClickHandler > spot: " + JSON.stringify(selectedSpot));

        if (props.searchButtonClick) {
            props.searchButtonClick(selectedSpot);
        }
    };

    useEffect(() => {
        if (selectedWater.id) {
            setAvailableSpots(dbSpots.filter((spot) => spot.water_id == selectedWater.id));
        }
    }, [dbSpots, selectedWater]);

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
                                <TypeAheadDropDown items={dbCountries} itemSelected={selectCountryHandler} />
                            </td>
                        </tr>
                        <tr>
                            <td className="dd-label-cell">
                                <h6>State/Region: </h6>
                            </td>
                            <td>
                                <TypeAheadDropDown items={availableStates} parent={selectedCountry} itemSelected={selectStateHandler} />
                            </td>
                        </tr>
                        <tr>
                            <td className="dd-label-cell">
                                <h6>Water: </h6>
                            </td>
                            <td>
                                <TypeAheadDropDown items={availableWaters} parent={selectedState} itemSelected={selectWaterHandler} />
                            </td>
                        </tr>
                        <tr>
                            <td className="dd-label-cell">
                                <h6>Spot: </h6>
                            </td>
                            <td>
                                <TypeAheadDropDown items={availableSpots} parent={selectedWater} itemSelected={selectSpotHandler} />
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
