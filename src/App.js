import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Banner from "./components/banner/Banner";
import Home from "./pages/index";
import Search from "./pages/Search";
import About from "./pages/About";
import PostReport from "./pages/PostReport";
import Signin from "./pages/Signin";
import Register from "./pages/Register";
import { useSelector } from "react-redux";

import "./App.css";

function App() {
    const user = useSelector((state) => state.user);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container-fluid h-100vh h-100vw app">
            <div className="row">
                <Banner />
            </div>
            <div className="row">
                <div className="col-11">
                    <Router>
                        <Navbar />
                        <Routes>
                            <Route path="/" exact ac element={<Home />}></Route>
                            <Route path="/Search" element={<Search />}></Route>
                            <Route path="/PostReport" element={<PostReport />}></Route>
                            <Route path="/About" element={<About />}></Route>
                            <Route path="/Signin" element={<Signin />}></Route>
                            <Route path="/Register" element={<Register />}></Route>
                        </Routes>
                    </Router>
                </div>
                <div className="col-1 float-right">
                    <div className="signin-col">{user.username ? "Signed in: " + user.username : <a href="/Signin">Signin</a>}</div>
                </div>
            </div>
        </div>
    );
}

export default App;
