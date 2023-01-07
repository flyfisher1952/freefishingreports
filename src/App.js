import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Banner from "./components/Banner";
import Home from "./pages/index";
import Search from "./pages/Search";
import About from "./pages/About";
import PostReport from "./pages/PostReport";
import Signin from "./pages/Signin";

import "./App.css";

function App() {
    return (
        <div className="container-fluid h-100vh h-100vw app">
            <div className="row">
                <Banner />
            </div>
            <div className="row">
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path="/" exact ac element={<Home />}></Route>
                        <Route path="/Search" element={<Search />}></Route>
                        <Route path="/PostReport" element={<PostReport />}></Route>
                        <Route path="/About" element={<About />}></Route>
                        <Route path="/Signin" element={<Signin />}></Route>
                    </Routes>
                </Router>
            </div>
        </div>
    );
}

export default App;
