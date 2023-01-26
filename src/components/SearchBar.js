/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import { UseFetchCountries, UseFetchStates, UseFetchWaters, UseFetchSpots } from "./hooks/SearchBarHooks";
import TypeAheadDropDown from "./Typeaheads/TypeAheadDropDown";

const SearchBar = () => {
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

    const selectCountryHandler = (country) => {
        setSelectedCountry(country);
        setAvailableStates(dbStates.filter((state) => state.country_id == country.id));
        console.log("==== selectCountryHandler =============================================");
        console.log("---> COUNTRY: " + JSON.stringify(country));
        console.log("---> AVAILABLE STATE COUNT: " + availableStates.length);
    };

    const selectStateHandler = (state) => {
        setSelectedState(state);
        setAvailableWaters(dbWaters.filter((water) => state.id == water.state_id));
        console.log("==== selectStateHandler =============================================");
        console.log("---> STATE: " + JSON.stringify(state));
        console.log("---> WATER KEYS: " + Object.keys(dbWaters[0]));
        console.log("---> DB WATER LENGTH: " + dbWaters.length);
        console.log("---> AVAILABLE WATER COUNT: " + availableWaters.length);
    };

    const selectWaterHandler = (water) => {
        setSelectedWater(water);
        setAvailableSpots(dbSpots.filter((spot) => water.id == spot.water_id));
        console.log("==== selectWaterHandler =============================================");
        console.log("---> WATER: " + JSON.stringify(water));
        console.log("---> SPOT KEYS: " + Object.keys(dbSpots[0]));
        console.log("---> AVAILABLE SPOT COUNT: " + setAvailableSpots.length);
    };

    const selectSpotHandler = (spot) => {
        setSelectedSpot(spot);
        console.log("==== selectSpotHandler =============================================");
        console.log("---> SPOT: " + JSON.stringify(spot));
    };

    useEffect(() => {});

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
                                <TypeAheadDropDown items={dbCountries} countrySelected={selectCountryHandler} />
                            </td>
                        </tr>
                        <tr>
                            <td className="dd-label-cell">
                                <h6>State/Region: </h6>
                            </td>
                            <td>
                                <TypeAheadDropDown items={availableStates} parent={selectedCountry} stateSelected={selectStateHandler} />
                            </td>
                        </tr>
                        <tr>
                            <td className="dd-label-cell">
                                <h6>Water: </h6>
                            </td>
                            <td>
                                <TypeAheadDropDown items={availableWaters} parent={selectedState} waterSelected={selectWaterHandler} />
                            </td>
                        </tr>
                        <tr>
                            <td className="dd-label-cell">
                                <h6>Spot: </h6>
                            </td>
                            <td>
                                <TypeAheadDropDown items={availableSpots} parent={selectedWater} spotSelected={selectSpotHandler} />
                            </td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td>
                                <Button className="float-right" variant="success">Get Fishing Reports</Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default SearchBar;
