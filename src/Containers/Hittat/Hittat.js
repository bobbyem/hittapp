import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import classes from "./Hittat.module.css";
import firebase from "../../Firebase";
import Login from "../../Components/UI/Login/Login";
import UserContext from "../../Contexts/UserContext";
const db = firebase.firestore();


function Hittat () {
    const [uploadSucess, setUploadSuccess] = useState(false);
    const [inputTitle, setInputTitle] = useState(null);
    const [inputAmount, setInputAmount] = useState(null);
    const [inputDescription, setInputDescription] = useState(null);
    const [inputImage, setInputImage] = useState(null);
    const [inputURL, setInputURL] = useState(null);
    const [placeholderTitle, setPlaceholderTitle] = useState("Titel");
    const [placeholderAmount, setPlaceholderAmount] = useState(0);
    const [placeholderDescription, setPlaceholderDescription] = useState("Beskriv det du hittat");
    
    
    useLayoutEffect(() => {
        console.log("useLayOutEffect at hittat.js");
    })
    

    const publishHandler = (event) => {
        event.preventDefault();
        //Grab a state reference
        let inputRef = {
            title: inputTitle,
            amount: inputAmount,
            description: inputDescription
        };
        let file = inputImage;
        let storageRef = firebase.storage().ref();
        let uploadTask = storageRef.child("uploads/" +file.name).put(file);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
            function (snapshot) {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("upload is " + progress + " % done.");
            },
            function(error) {
                console.log("Something went wrong..." + error);
            },
            function(complete) {
                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {

                    let url = downloadURL;
                    // Post data to firestore
                    db.collection("hittat").doc().set({
                        title: inputRef.title,
                        amount: inputRef.amount,
                        description: inputRef.description,
                        url: url
                    });
                    console.log("Upload Success")
                });
            }
            );
    setUploadSuccess(true);
    };

    const titlehandler = (event) => {
        let titleInput = event.target.value;
        setInputTitle(titleInput);
    }

    const amountHandler = (event) => {
        let amountInput = event.target.value;
        setInputAmount(amountInput);
    };

    const descriptionHandler = (event) => {
        let descriptionInput = event.target.value;
        setInputDescription(descriptionInput);
    };

    const fileChangedHandler = (event) => {
        let file = event.target.files[0];
        setInputImage(file);
    }

        if (!uploadSucess) {
            return (
                <div className={classes.Hittat}>
                    <form onSubmit={publishHandler}>
                        <h1>Vad har du hittat?</h1>
                        <label>Titel </label>
                        <input type="text" placeholder={placeholderTitle} onChange={titlehandler} required/>
                        <br/>
                        <label>Antal</label>
                        <input type="number" placeholder={placeholderAmount} onChange={amountHandler} required/>
                        <br/>
                        <label>Beskrivning</label>
                        <textarea type="text" placeholder={placeholderDescription} onChange={descriptionHandler} required/>
                        <br/>
                        <label>Bild</label>
                        <input type="file" accept="image/*" required onChange={fileChangedHandler}/>
                        <br/>
                        <button onSubmit={publishHandler}>Publicera</button>
                    </form>
                </div>
            )
        };

            return (
                <div>
                <h1>Tack för ditt bidrag!</h1>
                </div>
            );
    }


export default Hittat;