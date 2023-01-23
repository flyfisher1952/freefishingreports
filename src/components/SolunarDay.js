import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import { UsefetchSolunarDay } from "./hooks/SolunarDayHooks";

function SolunarDay() {
    const url = "https://solunarforecast.com/hunting_fishing/best_times/zip_postal_code/calendar/us/84325";
    const [solunarDay, isLoading] = UsefetchSolunarDay(url);

    const LoadingDisplay = () => {
        return (
            <div className="container-fluid">
                <div className="row justify-content-center h-100">
                    <div className="col hidden-md-down text-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                </div>
            </div>
        );
    };

    const LoadedDisplay = () => {
        return (
            <div className="row justify-content-center h-100">
                <div className="col hidden-md-down text-center">
                    <span> {solunarDay} </span>
                </div>
            </div>
        );
    };

    return (
        <div className="container-fluid h-100">
            <div className="row bordered-component">{isLoading ? <LoadingDisplay /> : <LoadedDisplay />}</div>
        </div>
    );
}

export default SolunarDay;
