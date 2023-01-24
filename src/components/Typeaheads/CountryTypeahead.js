import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

const COUNTRY_URL = "http://localhost:3033/country";

const CountryTypeahead = () => {
    const [selectedCountry, setSelectedCountry] = useState({});
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchCountries() {
        const response = await fetch(COUNTRY_URL);
        const json = await response.json();

        setCountries(json);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchCountries();
    }, []);

    return (
        <>
            {isLoading ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
                <Form.Group>
                    <Typeahead
                        id="country-typeahead"
                        labelKey="name"
                        onChange={(selected) => {
                            setSelectedCountry(selected);
                        }}
                        options={countries}
                        placeholder="Choose a country..."
                        selected={selectedCountry}
                    />
                </Form.Group>
            )}
        </>
    );
};

export default CountryTypeahead;
