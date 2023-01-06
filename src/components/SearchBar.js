import "bootstrap/dist/css/bootstrap.css";
import { Dropdown, DropdownButton } from "react-bootstrap";

import allCountries from "./../countries.json";
import allStates from "./../states.json";

const SearchBar = () => {
    let selectedCountry = {};
    let countryIsSelected = false;
    let selectedState = {};
    let stateIsSelected = false;

    const selectCountryHandler = (e) => {
        selectedCountry = e.target.value;
        countryIsSelected = Object.keys(selectedCountry) === 0;
        console.log(selectedCountry);
    };

    const selectStateHandler = (e) => {
        selectedState = e.target.value;
        stateIsSelected = Object.keys(selectedState) === 0;
        console.log(selectedState);
    };

    return (
        <>
            <h3>Select your filters</h3>
            <div className="bordered-component">
                <DropdownButton
                    id="country-dropdown"
                    className="dropdown-button"
                    size="sm"
                    expand="sm"
                    variant="light"
                    bg="light"
                    title="Select a Country"
                    onClick={selectCountryHandler}
                >
                    {
                        allCountries.map(country => {
                            <Dropdown.Item eventKey={country.id}>{country.name}</Dropdown.Item>
                        });

                        if (Object.keys(selectedCountry).length !== 0)
                        <div>
                        <DropdownButton
                            id="state-dropdown"
                            className="dropdown-button"
                            size="sm"
                            expand="sm"
                            variant="light"
                            bg="light"
                            title="Select a State"
                            onClick={selectStateHandler}
                            
                        >
                            {
                                allStates.forEach(state => {
                                    if(state.country_id === selectedCountry.id){
                                        <Dropdown.Item eventKey={state.id}>{state.name}</Dropdown.Item>
                                    }
                                });
                            }
                    }
                    </DropdownButton>
                </div>
    
                    }
                </DropdownButton>
            </div>
        </>
    );
};

export default SearchBar;
