/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";

// the next 2 are for the HTML returned from Solunar Day.
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular, brands, icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

const SolunarDay = (props) => {
    const [solunarDay, setSolunarDay] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    async function fetchSolunarDay(countryCode, postalCode) {
        try {
            setIsLoading(true);

            const response = await fetch("http://localhost:3033/solunarDay/" + countryCode + "/" + postalCode);

            response.text().then((html) => {
                html = html.replace("/images/moonimages", "https://solunarforecast.com/images/moonimages");
                for (let ii = 0; ii < 9; ii++) {
                    html = html.replace('<span class="glyphicon glyphicon-star"></span>', '<i class="fa-regular fa-star-sharp"></i>');
                }
                setSolunarDay(html);
                setIsLoading(false);
            });
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
