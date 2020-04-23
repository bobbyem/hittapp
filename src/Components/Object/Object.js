import React from "react";
import classes from "./Object.module.css";

const object = (props) => (
    <div className={classes.Object} onClick={props.clicked}>
        <h1>{props.title}</h1>
        <img src={props.url} alt={props.title}></img>
        <p>Antal: {props.amount}</p>
        <p>{props.description}</p>
    </div>
);

export default object;