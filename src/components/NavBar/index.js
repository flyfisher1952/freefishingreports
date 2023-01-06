import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

function Navbar() {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/"> Home </NavLink>
                    <NavLink to="/Search"> Find a Report </NavLink>
                    <NavLink to="/PostReport"> Post a Report </NavLink>
                    <NavLink to="/About"> About </NavLink>
                    <NavLink to="/Signin"> Signin/Up </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
}

export default Navbar;
