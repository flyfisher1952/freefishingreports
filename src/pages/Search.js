import React from "react";
import SearchBar from "../components/SearchBar";
import Reports from "../components/Reports";
import Adds from "../components/Adds";

const Search = () => {
    return (
        <div className="container-fluid">
        <div className="row align-items-start">
            <div className="col-2">
                <SearchBar />
            </div>
            <div className="col-8">
                <Reports />
            </div>
            <div className="col-2">
                <Adds />
            </div>
        </div>
    </div>
);
};

export default Search;
