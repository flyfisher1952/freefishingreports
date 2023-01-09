import React from "react";
import Adds from "../components/Adds";
import SearchBar from "../components/SearchBar";
import ReportEditor from "../components/ReportEditor";

const PostReport = () => {
    return (
        <div className="container-fluid">
            <div className="row align-items-start">
                <div className="col-2">
                    <SearchBar />
                </div>
                <div className="col-8">
                    <ReportEditor />
                </div>
                <div className="col-2">
                    <Adds />
                </div>
            </div>
        </div>
    );
};

export default PostReport;
