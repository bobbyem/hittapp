import React, { useState } from "react";
import classes from "./Login.module.css";
import firebase from "../../../Firebase";
import Aux from "../../../HOC/Auxiliary/Auxiliary";
import "firebase/auth";
const auth = firebase.auth();



const Login = (props) => {
    const [showLogin, setShowLogin] = useState(true);
    const [showRegister, setShowRegister] = useState(false);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loginEmail, setLoginEmail] = useState(null);
    const [loginPassword, setLoginPassword] = useState(null);
    const [registerEmail, setRegisterEmail] = useState(null);
    const [registerPassword, setRegisterPassword] = useState(null);

    const toggleLogin = () => {
        setShowLogin(!showLogin);
        setShowRegister(!showRegister);
        console.log("showLogin = " + showLogin, "showRegister = " + showRegister)
    }

    const toggleRegister = () => {
        setShowRegister(!showRegister);
        setShowLogin(!showLogin);
    }

    const loginSubmitHandler = (event) => {
        event.preventDefault();
        if (loginEmail && loginPassword != null) {
            auth.signInWithEmailAndPassword(loginEmail, loginPassword).catch(function(error){
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            } );
            setUserLoggedIn(true);
        }
    }

    const loginEmailChangedHandler = (event) => {
        setLoginEmail(event.target.value);
        console.log(loginEmail)
    }

    const loginPasswordChangedHandler = (event) => {
        setLoginPassword(event.target.value);
        console.log(loginPassword);
    }

    const registerSubmitHandler = (event) => {
        event.preventDefault();
        if (registerEmail && registerPassword != null) {
            auth.createUserWithEmailAndPassword(registerEmail, registerPassword).catch(function(error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            })
        }
    }

    const registerEmailChangedHandler = (event) => {
        setRegisterEmail(event.target.value);
        console.log(registerEmail);
    }

    const registerPassWordChangedHandler = (event) => {
        setRegisterPassword(event.target.value);
        console.log(registerPassword);
    }

    const logOutHandler = () => {
        auth.signOut().then(function(){
            console.log("Signout successfull");
        }).catch(function(error) {
            console.log(error.code);
        })
    } 

    return (
        <Aux>

        <div className={classes.Login} >
            
            
            <form className={classes.LoginForm} style={{display: (showLogin ? "flex" : "none")}} onSubmit={loginSubmitHandler}>
                <label>
                    E-post:
                </label>
                <input type="email" placeholder="e-post" onChange={loginEmailChangedHandler}></input>

                <br/>

                <label>
                    Lösenord:
                </label>
                <input type="password" placeholder="******" onChange={loginPasswordChangedHandler}></input>
                <button type="submit" onSubmit={props.login}>Logga in</button>
                <span>
                    <p>Saknar du konto?</p>
                    <p className={classes.Link} onClick={toggleLogin}>Registrera</p>
                </span>
            </form>


            <form className={classes.RegisterForm} style={{display: (!showLogin ? "flex" : "none")}} onSubmit={registerSubmitHandler}>
                <label>
                    E-post:
                </label>
                <input type="email" placeholder="e-post" onChange={registerEmailChangedHandler}></input>
               
                <br/>

                <label>
                    Lösenord:
                </label>
                <input type="password" placeholder="******" onChange={registerPassWordChangedHandler}></input>
                <button type="submit" onSubmit={props.register}>Registrera</button>
                <p>Har du redan ett konto?</p>
                <p className={classes.Link} onClick={toggleRegister}>Logga in</p>
            </form>

            <form className={classes.LogoutForm} style={{display: (userLoggedIn ? "flex" : "none")}}>
                <button type="submit" onSubmit={logOutHandler}>Logga ut</button>
            </form>
        </div>

        </Aux>
    )
}

export default Login;