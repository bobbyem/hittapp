import React from "react";
import classes from "./Footer.module.css";

const footer = (props) => (
    <div className={classes.Footer}>
    <ul className={classes.FooterLinks}>
        <li>Kontakt</li>
        <li>Lediga tjänster</li>
        <li>Om hittApp</li>
    </ul>
    </div>
);

export default footer;