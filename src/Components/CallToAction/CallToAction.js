import React from "react";
import classes from "./CallToAction.module.css";
import {NavLink} from "react-router-dom";
import heroImage from "../../img/hero.png";

const CallToAction = (props) => {
    return (
        <div className={classes.CallToAction}>
            <img src={heroImage} alt="Hittapp logo"/>
            <div className={classes.TextSection}>
                <h2>välkommen till</h2>
                <h1>hittApp</h1>
                <div className={classes.Copy}>
                    <p>Har du blivit av med något? Eller kanske hittat något du tror någon annan kan sakna?
                    hittApp är din platform för borttappade saker.
                    </p>
                </div>
                <div className={classes.ButtonBox}>
                    <NavLink to="/tappat" onClick={props.clicked}>
                        <button onClick={props.tappat}>tappat något?</button>
                    </NavLink>
        
                <NavLink to="/hittat"onClick={props.clicked}>
                    <button onClick={props.hittat}>hittat något?</button>
                </NavLink>
                    
                    
                </div>  
            </div>  
        </div>
    )
}

export default CallToAction;