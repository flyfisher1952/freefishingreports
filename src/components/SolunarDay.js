/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
// import { UsefetchSolunarDay } from "./hooks/SolunarDayHooks";

import "bootstrap/dist/css/bootstrap.min.css";

const SolunarDay = (props) => {
    const [solunarDay, setSolunarDay] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    async function fetchSolunarDay(countryCode, postalCode) {
        try {
            setIsLoading(true);

            const response = await fetch("http://localhost:3033/solunarDay/" + countryCode + "/" + postalCode);
            // const data = await response;

            response.text().then((html) => {
                setSolunarDay(html);
                setIsLoading(false);
            });
            // setSolunarDay(response.text());
            // setIsLoading(false);
        } catch (err) {
            console.error(err);
        }
    }

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
                <div className="col hidden-md-down text-center" dangerouslySetInnerHTML={{ __html: solunarDay }}></div>
            </div>
        );
    };

    useEffect(() => {
        fetchSolunarDay();
    }, []);

    return (
        <div className="container-fluid h-100">
            <div className="row bordered-component">{isLoading ? <LoadingDisplay /> : <LoadedDisplay />}</div>
        </div>
    );
};

export default SolunarDay;
