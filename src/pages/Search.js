import React from "react";
import SearchBar from "../components/SearchBar";
import ReportList from "../components/ReportList";
import Adds from "../components/Adds";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchFilters: [],
        };
    }

    searchClickHandler = () => {};

    render() {
        return (
            <div className="container-fluid">
                <div className="row align-items-start">
                    <div className="col-2">
                        <SearchBar onClick={this.searchClickHandler} />
                    </div>
                    <div className="col-8">
                        <ReportList />
                    </div>
                    <div className="col-2">
                        <Adds />
                    </div>
                </div>
            </div>
        );
    }
}
