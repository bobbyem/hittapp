import React from "react";
import classes from "./ObjectSmall.module.css";

function ObjectSmall (props) {
    return (
        <div className={classes.ObjectSmall}>
         <img src={props.url} alt={props.title} onClick={props.clicked}/>
        </div>
    )
}

export default ObjectSmall;