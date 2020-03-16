import React from "react";
import classes from "./Layout.module.css";
import SideDrawer from "../UI/SideDrawer/SideDrawer";
import Header from "../UI/Header/Header";


const layout = (props) => (
    <div className={classes.Layout}>
        <Header/>
        <SideDrawer/>    
        <main>{props.children}</main>
    </div>
);

export default layout;