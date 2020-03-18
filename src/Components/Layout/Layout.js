import React, { useState } from "react";
import classes from "./Layout.module.css";
import SideDrawer from "../UI/SideDrawer/SideDrawer";
import Header from "../UI/Header/Header";
import Overlay from "../UI/Overlay/Overlay";


const Layout = (props) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuToggle = () => {
        setMenuOpen(!menuOpen);
        console.log(menuOpen);
    };
    let menuHeight = (menuOpen ? 80 : 0);
    let overlayDisplay = (menuOpen ? "block" : "none");
    
    return (
    <div className={classes.Layout}>
        <Header clicked={menuToggle}/>
        <SideDrawer  height={menuHeight} clicked={menuToggle}/>    
        <main>{props.children}</main>
        <Overlay display={overlayDisplay} clicked={menuToggle}/>
    </div>
);

}

export default Layout;