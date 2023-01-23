import React from "react";
import GoogleAd from "./GoogleAd";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Adds = () => {
    return (
        <div className="container-fluid h-100">
            <div className="row bordered-component">
                <GoogleAd />
            </div>
        </div>
    );
};

export default Adds;
