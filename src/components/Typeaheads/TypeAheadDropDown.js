// TypeAheadDropDown.js
import "./TypeAheadDropDown.css";
import React from "react";

export default class TypeAheadDropDown extends React.Component {
    constructor(props, placeHolder) {
        super(props);
        this.state = {
            suggestions: [],
            text: "",
        };
        this.placeHolder = placeHolder ? placeHolder : "Choose ...";
    }

    onTextChange = (e) => {
        const { items } = this.props;
        let suggestions = [];
        const value = e.target.value;

        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, `i`);
            suggestions = items.filter((v) => regex.test(v));
        }

        this.setState(() => ({
            suggestions,
            text: value,
        }));
    };

    suggestionSelected = (value) => {
        this.setState(() => ({
            text: value,
            suggestions: [],
        }));
    };

    renderSuggestions = () => {
        const { suggestions } = this.state;
        console.log("suggestions :", suggestions);
        if (suggestions.length === 0) {
            return null;
        }

        return (
            <ul>
                {suggestions.map((item) => (
                    <li key={item} onClick={(e) => this.suggestionSelected(item)}>
                        {item}
                    </li>
                ))}
            </ul>
        );
    };

    render() {
        const { text } = this.state;
        return (
            <div className="TypeAheadDropDown">
                <input onChange={this.onTextChange} placeholder="Search city name" value={text} type="text" />
                {this.renderSuggestions()}
            </div>
        );
    }
}
