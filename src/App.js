import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Banner from "./components/Banner";
import Home from "./pages/Home";
import Search from "./pages/Search";
import PostReport from "./pages/PostReport";

import "./App.css";

function App() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <Banner />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand href="#home">Free Fishing Reports</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto" variant="tabs" activeKey="/home">
                                <Nav.Item>
                                    <Nav.Link href="/Home">Home </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="/Search">Find a Report</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="/PostReport">Post a Report</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="/Register">Register/Signin</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </div>
        </div>
    );
}

export default App;
