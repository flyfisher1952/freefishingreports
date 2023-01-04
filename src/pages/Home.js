import React from "react";
import SearchBar from "../components/SearchBar";
import Blog from "../components/Blog";
import "bootstrap/dist/css/bootstrap.css";

const Home = () => {
    return (
        <div className="container-fluid">
            <div className="row align-items-start">
                <div className="col-3">
                    <SearchBar />
                </div>
                <div className="col-9">
                    <Blog />
                </div>
            </div>
        </div>
    );
};

export default Home;
