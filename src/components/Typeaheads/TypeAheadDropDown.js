/* eslint-disable eqeqeq */
import "./TypeAheadDropDown.css";
import React from "react";

export default class TypeAheadDropDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: [],
            text: "",
            selectedItem: {},
        };
    }

    onTextChange = (e) => {
        const { items, parent } = this.props;
        let suggestions = [];
        const value = e.target.value;

        console.log("---- onTextChange ----------------------------------------------");
        console.log("===>          VALUE: " + value);
        console.log("===>         PARENT: " + (parent ? JSON.stringify(parent) : "None"));

        if (value.length > 0) {
            const regex = new RegExp(`${value}`, `i`);

            suggestions = items.filter((item) => regex.test(item.name));

            if (parent && Object.hasOwn(parent, "id")) {
                if (Object.hasOwn(parent, "type")) {
                    console.log("===> FILTERING STATE on ID: " + parent.id);
                    suggestions = items.filter((item) => item.state_id == parent.id).filter((item) => regex.test(item.name));
                } else if (Object.hasOwn(parent, "state_code")) {
                    console.log("===> FILTERING WATER on ID: " + parent.country_id);
                    suggestions = items.filter((item) => item.state_id == parent.id).filter((item) => regex.test(item.name));
                } else if (Object.hasOwn(parent, "kind")) {
                    console.log("===> FILTERING SPOT on ID: " + parent.id);
                    suggestions = items.filter((item) => item.id == parent.id).filter((item) => regex.test(item.name));
                }
            }
        }

        this.setState(() => ({
            suggestions,
            text: value,
            selectedItem: {},
        }));
    };

    suggestionSelected = (item) => {
        const { countrySelected, stateSelected, waterSelected, spotSelected } = this.props;

        this.setState(() => ({
            text: item.name,
            suggestions: [],
            selectedItem: item,
        }));

        console.log();
        console.log("+++> ITEM: " + JSON.stringify(item));

        if (countrySelected) countrySelected(item);
        if (stateSelected) stateSelected(item);
        if (waterSelected) waterSelected(item);
        if (spotSelected) spotSelected(item);
    };

    renderSuggestions = () => {
        const { suggestions } = this.state;

        if (suggestions.length === 0) {
            return null;
        }

        return (
            <ul>
                {suggestions.map((item) => (
                    <li key={item.id} onClick={(e) => this.suggestionSelected(item)}>
                        {item.name}
                    </li>
                ))}
            </ul>
        );
    };

    render() {
        const { text } = this.state;
        return (
            <div className="TypeAheadDropDown">
                <input onChange={this.onTextChange} placeholder="Choose ..." value={text} type="text" />
                {this.renderSuggestions()}
            </div>
        );
    }
}
