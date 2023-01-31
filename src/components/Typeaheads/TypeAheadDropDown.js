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

        if (value.length > 0) {
            const regex = new RegExp(`${value}`, `i`);

            suggestions = items.filter((item) => regex.test(item.name));

            if (parent && Object.hasOwn(parent, "id")) {
                if (Object.hasOwn(parent, "table_name")) {
                    switch (parent["table_name"]) {
                        case "country":
                            suggestions = items.filter((item) => item.country_id == parent.id).filter((item) => regex.test(item.name));
                            break;
                        case "state":
                            suggestions = items.filter((item) => item.state_id == parent.id).filter((item) => regex.test(item.name));
                            break;
                        case "water":
                            suggestions = items.filter((item) => item.water_id == parent.id).filter((item) => regex.test(item.name));
                            break;
                        default:
                            break;
                    }
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
        const { itemSelected } = this.props;

        this.setState(() => ({
            text: item.name,
            suggestions: [],
            selectedItem: item,
        }));

        if (itemSelected) itemSelected(item);
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
