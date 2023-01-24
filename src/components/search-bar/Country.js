import React, { useState, useEffect, useCallback, useEffect } from "react";
import { Typeahead, HighLighter, Menu, MenuItem } from "react-bootstrap-typeahead";
import List from "react-tiny-virtual-list";
import { UseFetchCountries } from "../hooks/SearchBarHooks";

import "react-bootstrap-typeahead/css/Typeahead.css";
import "./styles.css";

const Country = () => {
    const [countries, isLoading] = UseFetchCountries([]);
    const [selectedCountry, setSelectedCountry] = useState([]);

    const options = countries.map((country) => {country.name});

    const renderMenu = useCallback((results, menuProps, props) => {
        const itemHeight = 32;

        return (
            <Menu {...menuProps}>
                <List
                    scrollToIndex={props.activeIndex || 0}
                    scrollToAlignment="auto"
                    height={results.length < 5 ? results.length * itemHeight : 300}
                    itemCount={results.length}
                    itemSize={itemHeight}
                    renderItem={({ index, style }) => {
                        const item = results[index];
                        return (
                            <MenuItem key={item} option={item} position={index} style={style}>
                                <HighLighter search={props.text}>{item}</HighLighter>
                            </MenuItem>
                        );
                    }}
                />
            </Menu>
        );
    });

    return (
        <Typeahead
            id="country-picker"
            maxResults={false}
            options={options}
            paginate={false}
            placeholder="Select a country..."
            renderMenu={renderMenu}
        />
    );
};

export default Country;