import React from "react";
import classes from "./Overlay.module.css";

const overlay = (props) => {
    return (
        <div style={{display: props.display}} className={classes.Overlay} onClick={props.clicked}></div>
    )

}

export default overlay;