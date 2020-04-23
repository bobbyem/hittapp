import React from "react";
import classes from "./ObjectFull.module.css";

function ObjectFull (props) {
    return (
        <div className={classes.ObjectFull} onClick={props.clicked}>   

            <div className={classes.ImageSection}>
                <img src={props.url} alt={props.title}/>
            </div>
            
            <div className={classes.TextSection}>
                    <h1>{props.title}</h1>

                    <h4>Antal</h4>
                    <p>{props.amount}</p>
                
                    <h4>Beskrivning</h4>
                    <p>{props.description}</p>
            </div>
            
        </div>
    )

}

export default ObjectFull;