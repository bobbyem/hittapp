import React from "react";
import classes from "./SideDrawer.module.css";
import {NavLink} from "react-router-dom";

const sideDrawer = (props) => (
    <div className={classes.SideDrawer} style={{height: props.height}}>
        <ul style={{display: (props.height === 0 ? "none" : "contents")}}>
            <NavLink to="/hittat" onClick={props.clicked}>
                <li>Hittat</li>
            </NavLink>
    
            <NavLink to="/tappat"onClick={props.clicked}>
                <li>Tappat</li>
            </NavLink>
        </ul>
    </div>
);

export default sideDrawer;