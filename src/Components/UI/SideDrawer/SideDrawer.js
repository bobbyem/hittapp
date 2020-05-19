import React from "react";
import classes from "./SideDrawer.module.css";
import {NavLink} from "react-router-dom";
import AccountIcon from "../../../img/accounticon.png";



const sideDrawer = (props) => (
    <div className={classes.SideDrawer} style={{height: props.height}}>
    
        <ul style={{display: (props.height === 0 ? "none" : "contents")}}>
            <NavLink to="/login"onClick={props.clicked} className={classes.AccountIcon}>
                <img src={AccountIcon} alt="account icon" tooltip="Ehee dd ds"/>
            </NavLink>

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