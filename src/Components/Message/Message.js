import React from "react";
import classes from "./Message.Module.css";

function Message (props)  {
    return (
        <div className={classes.Message}>
        <h1>Tyvärr{props.messageHeader}</h1>
        <p>{props.messageText}Tyvärr fanns inte det du tappat i vår databas. Försök igen vid ett senare tillfälle?</p>
        </div>
    )

};

export default Message;