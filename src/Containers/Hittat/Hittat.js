import React, { Component } from "react";
import classes from "./Hittat.module.css";
import storage from "../../Firebase";
import firebase from "../../Firebase";
const db = firebase.firestore();

class hittat extends Component {
    state = {
        requiredFilled: false,
        input: {
            title: null,
            amount: 0,
            description: null,
            image: null,
            url: null
        },
        placeholder: {
            title: "Titel",
            amount: 0,
            description: "Beskriv det du hittat..."
        }
    }
    componentDidMount() {
        document.title="hittApp";
    }

    publishHandler = (event) => {
        event.preventDefault();
        console.log(this.state.input);
        let url = "";
        let file = this.state.input.image;
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
                    console.log(downloadURL);
                    // Here is where I wish I could store the downloadURL into the url variable declared earlier
                    
                });
            }
            );
        
        // Post data to firebase.
        db.collection("hittat").doc().set({
            title: this.state.input.title,
            amount: this.state.input.amount,
            description: this.state.input.description
        });
        
    };

    titlehandler = (event) => {
        let titleInput = event.target.value;
        this.setState(state => ({
            input: {
                ...state.input,
                title: titleInput
            }
        }));
        console.log(titleInput);
        console.log(this.state.input);
    }

    amountHandler = (event) => {
        let amountInput = event.target.value;
        this.setState(state => ({
            input: {
                ...state.input,
                amount: amountInput
            }
        }));
        console.log(this.state.input.amount);
    };

    descriptionHandler = (event) => {
        let descriptionInput = event.target.value;
        this.setState(state => ({
            input: {
                ...state.input,
                description: descriptionInput
            }
        }));
        console.log(this.state.input.description);
    };

    fileChangedHandler = (event) => {
        let file = event.target.files[0];
        this.setState(state => ({
            input: {
                ...state.input,
                image: file
            }
        }));
    }



    render () {


        return (
            <div className={classes.Hittat}>
                <form onSubmit={this.publishHandler}>
                    <h1>Vad har du hittat?</h1>
                    <label>Titel </label>
                    <input type="text" placeholder={this.state.placeholder.title} onChange={this.titlehandler} required/>
                    <br/>
                    <label>Antal</label>
                    <input type="number" placeholder={this.state.placeholder.amount} onChange={this.amountHandler} required/>
                    <br/>
                    <label>Beskrivning</label>
                    <textarea type="text" placeholder={this.state.placeholder.description} onChange={this.descriptionHandler} required/>
                    <br/>
                    <label>Bild</label>
                    <input type="file" accept="image/*" required onChange={this.fileChangedHandler}/>
                    <br/>
                    <button onSubmit={this.publishHandler}>Publicera</button>
                </form>
            </div>
        )
    }
}

export default hittat;
