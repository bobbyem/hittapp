import React, { useState } from "react";
import classes from "./Login.module.css";



const Login = (props) => {
    const [showLogin, setShowLogin] = useState(true);
    const [showRegister, setShowRegister] = useState(false);
    const [showLogout, setShowLogout] = useState(false);

    const toggleLogin = () => {
        setShowLogin(!showLogin);
        setShowRegister(!showRegister);
        console.log("showLogin = " + showLogin, "showRegister = " + showRegister)
    }

    const toggleRegister = () => {
        setShowRegister(!showRegister);
        setShowLogin(!showLogin);
    }

    const toggleLogout = () => {
        setShowLogout(!showLogout);
    }

    return (
        <div className={classes.Login} style={{display: (showLogin ? "content" : "none")}}>
            <form className={classes.LoginForm}>
                <label>
                    E-post:
                </label>
                <input type="email" placeholder="e-post"></input>

                <br/>

                <label>
                    Lösenord:
                </label>
                <input type="password" placeholder="******"></input>
                <button type="submit" onSubmit={props.login}>Logga in</button>
                <span>
                    <p>Saknar du konto?</p>
                    <p className={classes.Link} onClick={toggleLogin}>Registrera</p>
                </span>
            </form>

            <form className={classes.RegisterForm} style={{display: (showRegister ? "content" : "none")}}>
                <label>
                    E-post:
                </label>
                <input type="email" placeholder="e-post"></input>
               
                <br/>

                <label>
                    Lösenord:
                </label>
                <input type="password" placeholder="******"></input>
                <button type="submit" onSubmit={props.register}>Registrera</button>
                <p>Har du redan ett konto?</p>
                <p className={classes.Link} onClick={toggleRegister}>Logga in</p>
            </form>

            <form className={classes.LogoutForm} style={{display: (showLogout ? "content" : "none")}}>
                <button type="submit" onSubmit={props.logout}>Logga ut</button>
            </form>
        </div>
    )
}

export default Login;