import React, { useState, useLayoutEffect, useContext} from "react";
import classes from "./Login.module.css";
import firebase from "../../../Firebase";
import Aux from "../../../HOC/Auxiliary/Auxiliary";
import UserContext from "../../../Contexts/UserContext";
import "firebase/auth";
const auth = firebase.auth();
let provider = new firebase.auth.GoogleAuthProvider();



const Login = (props) => {
    const [showLogin, setShowLogin] = useState(true);
    const [showRegister, setShowRegister] = useState(false);
    const [loginEmail, setLoginEmail] = useState(null);
    const [loginPassword, setLoginPassword] = useState(null);
    const [registerEmail, setRegisterEmail] = useState(null);
    const [registerPassword, setRegisterPassword] = useState(null);
    const {user, setUser} = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState("");


    useLayoutEffect(() => {
        //Check if user is logged in
        auth.onAuthStateChanged((user => {
            if (user) {
                //User is logged in - Set user
                setUser(user);
                console.log(user.displayName)
                console.log("User logged in: ");
            }else {
                //User not logged in - clear User
                setUser(null);
                console.log("No user logged in...")
                if (errorMessage) {
                    setTimeout(function () { setErrorMessage(null)}, 5000);
                }
            }
        }))
    })

    const toggleLogin = () => {
        setShowLogin(!showLogin);
        setShowRegister(!showRegister);
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
                if(errorCode === "auth/user-not-found") {
                    setErrorMessage("Vi har ingen användare som stämmer med den adressen. Kontrollera uppgifterna, registrera ett konto eller logga in med ditt Google-konto.")
                }
                if(errorCode === "auth/wrong-password") {
                    setErrorMessage("Lösenordet stämmer tyvärr inte, var god kontrollera.")
                }
                console.log(errorCode);
                console.log(errorMessage);
            } );
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
                if(errorCode === "auth/email-already-in-use") {
                    setErrorMessage("Det finns redan en registrerad användare med den e-post-adressen.")
                }
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

    const logOutHandler = (event) => {
        event.preventDefault();
        auth.signOut().then(function(){
            console.log("Signout successfull");
            setUser(null);
        }).catch(function(error) {
            console.log(error.code);
        })
    }
    
    const googleLogin = () => {
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            console.log("token: ", token);
            var user = result.user;
            console.log("user: ", user)
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            console.log(errorCode);
            var errorMessage = error.message;
            console.log(errorMessage);

            // The email of the user's account used.
            var email = error.email;
            console.log(email);
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            console.log(credential)
          });
    }
 
    return (
        <Aux>

        <div className={classes.Login} >
            
            
            <form className={classes.LoginForm} style={{display: (showLogin && !user ? "flex" : "none")}} onSubmit={loginSubmitHandler}>
                <p>{errorMessage}</p>
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
                    <p className={classes.Link} onClick={googleLogin} >Logga in med Google</p>
                </span>
            </form>


            <form className={classes.RegisterForm} style={{display: (!showLogin && !user ? "flex" : "none")}} onSubmit={registerSubmitHandler}>
                <p>{errorMessage}</p>
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


            <form className={classes.LogoutForm} onSubmit={logOutHandler} style={{display: (user ? "flex" : "none")}}>
                <p>Du är inloggad på hittApp, välj från menyn ovan.</p>
                <p>Är du färdig med hittApp?</p>
                <button type="submit" >Logga ut</button>
            </form>
        </div>
        </Aux>
    )
}

export default Login;