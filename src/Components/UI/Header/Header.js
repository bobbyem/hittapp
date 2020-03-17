import React from "react";
import classes from "./Header.module.css";
import logo from "../../../img/logo.png";

const header = (props) => (
    <div className={classes.Header} onClick={props.clicked}>
    <img src={logo} alt="Hittapp logo" className={classes.Logo}/>
    {props.children}</div>
);

export default header;