import React from "react";
import SolunarDay from "../components/SolunarDay";
import Blog from "../components/Blog";
import Adds from "../components/Adds";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
    return (
        <div className="container-fluid h-100">
            <div className="row align-items-start h-100">
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
