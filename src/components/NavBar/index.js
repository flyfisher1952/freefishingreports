import React from "react";
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from "./NavbarElements";

const Navbar = () => {
    return (
        <>
            <Nav>
                <Bars />

                <NavMenu>
                    <NavLink to="/" activeStyle>
                        Home
                    </NavLink>
                    <NavLink to="/Search" activeStyle>
                        Find a Report
                    </NavLink>
                    <NavLink to="/Post" activeStyle>
                        Post a Report
                    </NavLink>
                    <NavLink to="/About" activeStyle>
                        About
                    </NavLink>
                    <NavLink to="/Register" activeStyle>
                        Sign In/Up
                    </NavLink>
                    {/* Second Nav */}
                    {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/Signin">Sign In</NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    );
};

export default Navbar;
