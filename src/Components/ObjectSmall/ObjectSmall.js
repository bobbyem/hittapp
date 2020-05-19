import React from "react";
import classes from "./ObjectSmall.module.css";

function ObjectSmall (props) {
    return (
        <div className={classes.ObjectSmall} onClick={props.clicked}>
         <img src={props.url} alt={props.title}/>
         <div className={classes.HoverInfo}>
            <h4>{props.title}</h4>
            <p>{props.description}</p>
         </div>
        </div>
    )
}

export default ObjectSmall;