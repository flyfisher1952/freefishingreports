import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Banner from "./components/Banner";
import Home from "./pages/index";
import Search from "./pages/Search";
import About from "./pages/About";
import PostReport from "./pages/PostReport";
import Register from "./pages/Register";

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
                    <Router>
                        <Navbar />
                        <Routes>
                            <Route path="/" exact ac element={<Home />}></Route>
                            <Route path="/Search" element={<Search />}></Route>
                            <Route path="/PostReport" element={<PostReport />}></Route>
                            <Route path="/About" element={<About />}></Route>
                            <Route path="/Register" element={<Register />}></Route>
                        </Routes>
                    </Router>
                </div>
            </div>
        </div>
    );
}

export default App;
