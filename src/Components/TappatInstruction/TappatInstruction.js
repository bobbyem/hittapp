import React from "react";
import classes from "./TappatInstruction.module.css";

function TappatInstruction (props) {
    return (
        <div className={classes.Instruction}>
            <h1>Tappat något?</h1>
            <p>Vad tråkigt, men har du lite tur så har någon annan hittat det åt dig. Använd sökfältet ovan så håller vi tummarna <span role="img" aria-label="Fingers crossed">&#128077;&#127995;</span></p>
        </div>
    )
}

export default TappatInstruction;