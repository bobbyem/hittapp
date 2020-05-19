import React from "react";
import classes from "./Header.module.css";
import Burger from "react-css-burger";

const header = (props) => (
    <div className={classes.Header}>
    <Burger color="white" hoverOpacity={0.8} onClick={props.clicked} active={props.active} burger="spring"/>
    <h1>hittApp</h1>
    {props.children}</div>
);

export default header;
// CSS Burger docs
// https://github.com/mattvox/react-css-burger