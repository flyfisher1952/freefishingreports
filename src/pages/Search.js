import React from "react";
import SearchBar from "../components/SearchBar";
import ReportList from "../components/ReportList";
import Adds from "../components/Adds";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            breadCrumbs: "",
            reportItems: [],
            spot: {},
            error: null,
        };
    }

    fetchReports = (spot) => {
        let url = "http://localhost:3033/report/spot/" + spot.id;
        console.log("---> Search > fetchReports > URL: " + url);
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    this.setState({ error: "error", loading: true });
                }
            })
            .then((data) => this.setState({ reportItems: data, loading: false }))
            .catch((error) => this.setState({ error: error, loading: false }));
    };

    componentDidUpdate(prevProps) {
        console.log("+++> Search > componentDidUpdate > prevProps: " + JSON.stringify(prevProps));
        console.log("+++> Search > componentDidUpdate > props: " + JSON.stringify(this.props));
    }

    searchClickHandler = (spot) => {
        let crumbs = spot.country_code + " > " + spot.state_code + " > " + spot.water_name + " > " + spot.name;
        this.setState({ spot: spot, breadCrumbs: crumbs });
        this.fetchReports(spot);
    };

    render() {
        return (
            <div className="container-fluid">
                <div className="row align-items-start">
                    <div className="col-2">
                        <SearchBar searchButtonClick={this.searchClickHandler} />
                    </div>
                    <div className="col-8">
                        <ReportList breadCrumbs={this.state.breadCrumbs} reports={this.state.reportItems} />
                    </div>
                    <div className="col-2">
                        <Adds />
                    </div>
                </div>
            </div>
        );
    }
}
