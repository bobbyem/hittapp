import React from "react";
import classes from "./Header.module.css";

const header = (props) => (
    <div className={classes.Header}>
    <h1>hittApp</h1>
    {props.children}</div>
);

export default header;