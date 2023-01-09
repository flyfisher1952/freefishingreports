import React from "react";
import SolunarDay from "../components/SolunarDay";
import Blog from "../components/Blog";
import Adds from "../components/Adds";

import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
    return (
        <div className="container-fluid">
            <div className="row align-items-start">
                <div className="col-2">
                    <SolunarDay />
                </div>
                <div className="col-8">
                    <Blog />
                </div>
                <div className="col-2">
                    <Adds />
                </div>
            </div>
        </div>
    );
};

export default Home;
