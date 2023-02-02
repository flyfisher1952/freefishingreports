import React, { useState, useEffect, useRef } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { Editor } from "@tinymce/tinymce-react";
import Button from "react-bootstrap/Button";
import { Table } from "react-bootstrap";
import Adds from "../components/Adds";
import CurrentUser from "../components/db-services/CurrentUser";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";

const PostReport = () => {
    const [dbCountries, setDbCountries] = useState([]);
    const [dbStates, setDbStates] = useState([]);
    const [dbWaters, setDbWaters] = useState([]);
    const [dbSpots, setDbSpots] = useState([]);

    const [selectedCountry, setSelectedCountry] = useState({});
    const [selectedState, setSelectedState] = useState({});
    const [selectedWater, setSelectedWater] = useState({});
    const [selectedSpot, setSelectedSpot] = useState({});

    const [isLoadingCountries, setIsLoadingCountries] = useState(true);
    const [isLoadingStates, setIsLoadingStates] = useState(true);
    const [isLoadingWaters, setIsLoadingWaters] = useState(true);
    const [isLoadingSpots, setIsLoadingSpots] = useState(true);

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const editorRef = useRef(null);
    const [status, setStatus] = useState("");

    async function getCountries() {
        setIsLoadingCountries(true);

        const response = await fetch("http://localhost:3033/country");
        const json = await response.json();

        setDbCountries(json);
        setIsLoadingCountries(false);
    }

    async function getStates() {
        setIsLoadingStates(true);

        const url = "http://localhost:3033/state" + (selectedCountry.country[0] ? "/country/" + selectedCountry.country[0].id : "");
        const response = await fetch(url);
        const json = await response.json();

        setDbStates(json);
        setIsLoadingStates(false);
    }

    async function getWaters() {
        setIsLoadingWaters(true);

        const url = "http://localhost:3033/water" + (selectedState.state[0] ? "/state/" + selectedState.state[0].id : "");
        const response = await fetch(url);
        const json = await response.json();

        setDbWaters(json);
        setIsLoadingWaters(false);
    }

    async function getSpots() {
        setIsLoadingSpots(true);

        const url = "http://localhost:3033/spot" + (selectedWater.water[0] ? "/water/" + selectedWater.water[0].id : "");
        const response = await fetch(url);
        const json = await response.json();

        setDbSpots(json);
        setIsLoadingSpots(false);
    }

    const enableButton = () => {
        let isDisabled = !(
            Object.hasOwn(selectedCountry, "country") &&
            Object.hasOwn(selectedState, "state") &&
            Object.hasOwn(selectedWater, "water") &&
            Object.hasOwn(selectedSpot, "spot") &&
            editorRef.current
        );

        setButtonDisabled(isDisabled);
    };

    useEffect(() => {
        enableButton();
    }, [selectedCountry, selectedState, selectedWater, selectedSpot]);

    const postIt = async () => {
        if (editorRef.current) {
            const user = new CurrentUser();
            let report = {
                water_id: selectedWater.water[0].id,
                spot_id: selectedSpot.spot[0].id,
                post_date: new Date().toISOString().split("T")[0],
                author: user.userName,
                body: editorRef.current.getContent(),
            };

            const response = await fetch("http://localhost:3033/report", {
                method: "POST",
                mode: "cors",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(report),
            });
            const responseObject = await response.json();

            if (response.status === 200 && responseObject.affectedRows === 1) {
                setStatus("Report Submitted successfully.");
            } else {
                setStatus("Report Submition Failed.");
            }
        }
    };

    return (
        <div className="container-fluid">
            <div className="row text-center">
                <div className="col-4"></div>
                <div className="col-4">
                    <h4>Create a Report</h4>
                </div>
                <div className="col-4"></div>
            </div>
            <div className="row">
                <div className="col-3">
                    <Table className="table search-bar-filter">
                        <tbody>
                            <tr>
                                <td className="dd-label-cell">
                                    <h6>Country: </h6>
                                </td>
                                <td>
                                    <AsyncTypeahead
                                        id="country-typeahead"
                                        isLoading={isLoadingCountries}
                                        labelKey={(option) => `${option.name}`}
                                        onSearch={getCountries}
                                        options={dbCountries}
                                        onChange={(country) => {
                                            setSelectedCountry({ country });
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="dd-label-cell">
                                    <h6>State/Region: </h6>
                                </td>
                                <td>
                                    <AsyncTypeahead
                                        id="state-typeahead"
                                        isLoading={isLoadingStates}
                                        labelKey={(option) => `${option.name}`}
                                        onSearch={getStates}
                                        options={dbStates}
                                        onChange={(state) => {
                                            setSelectedState({ state });
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="dd-label-cell">
                                    <h6>Water: </h6>
                                </td>
                                <td>
                                    <AsyncTypeahead
                                        id="water-typeahead"
                                        isLoading={isLoadingWaters}
                                        labelKey={(option) => `${option.name}`}
                                        onSearch={getWaters}
                                        options={dbWaters}
                                        onChange={(water) => {
                                            setSelectedWater({ water });
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="dd-label-cell">
                                    <h6>Spot: </h6>
                                </td>
                                <td>
                                    <AsyncTypeahead
                                        id="spot-typeahead"
                                        isLoading={isLoadingSpots}
                                        labelKey={(option) => `${option.name}`}
                                        onSearch={getSpots}
                                        options={dbSpots}
                                        onChange={(spot) => {
                                            setSelectedSpot({ spot });
                                        }}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className="col-6">
                    <Table>
                        <tbody>
                            <tr>
                                <td>
                                    <Editor
                                        tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
                                        onInit={(evt, editor) => (editorRef.current = editor)}
                                        init={{
                                            height: 300,
                                            menubar: false,
                                            plugins: [
                                                "advlist",
                                                "autolink",
                                                "lists",
                                                "link",
                                                "image",
                                                "charmap",
                                                "anchor",
                                                "searchreplace",
                                                "visualblocks",
                                                "code",
                                                "fullscreen",
                                                "insertdatetime",
                                                "media",
                                                "table",
                                                "preview",
                                                "help",
                                                "wordcount",
                                            ],
                                            toolbar: "undo redo | bold italic | removeformat",
                                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Button className="float-right" variant="success" disabled={buttonDisabled} onClick={postIt}>
                                        Submit Report
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <td>{status}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className="col-3">
                    <Adds />
                </div>
            </div>
        </div>
    );
};

export default PostReport;
