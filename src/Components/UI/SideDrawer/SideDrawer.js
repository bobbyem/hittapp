import React from "react";
import classes from "./SideDrawer.module.css";

const sideDrawer = (props) => (
    <div className={classes.SideDrawer} style={{height: props.height}}>
        <ul>
            <li>Hittat</li>
            <li>Tappat</li>
        </ul>
    </div>
);

export default sideDrawer;