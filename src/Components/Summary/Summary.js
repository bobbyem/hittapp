import React from "react";
import classes from "./Summary.module.css";

function Summary (props) {
    return (
        <div className={classes.Summary}>
            <h1 className={classes.Title}>Senast på hittApp</h1>
            <div className={classes.ObjectSection}>{props.children}</div>
        </div>
    )
}

export default Summary;