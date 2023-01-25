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
        const { items } = this.props;
        let suggestions = [];
        const value = e.target.value;

        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, `i`);
            suggestions = items.filter((v) => regex.test(v.name));
        }

        this.setState(() => ({
            suggestions,
            text: value,
            selectedItem: {},
        }));
    };

    suggestionSelected = (value) => {
        this.setState(() => ({
            text: value,
            suggestions: [],
            selectedItem: {},
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
                    <li key={item.id} onClick={(e) => this.suggestionSelected(item.name)}>
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
