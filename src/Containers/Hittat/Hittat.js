import React, { Component } from "react";
import classes from "./Hittat.module.css";

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

    publishHandler = (event) => {
        event.preventDefault();
        let formValue = event.target.value;
        alert(formValue);
    };

    titlehandler = (event) => {
        let titleInput = event.target.value;
        this.setState({input:{title: titleInput}});
        console.log(this.state.input.title);
    }

    amountHandler = (event) => {
        let amountInput = event.target.value;
        this.setState({input:{amount: amountInput}});
        console.log(this.state.input.amount);
    };

    descriptionHandler = (event) => {
        let descriptionInput = event.target.value;
        this.setState({input:{title: descriptionInput}});
        console.log(this.state.input.description);
    };

    fileHandler = (event) => {
        let imageInput = event.target.value;
        this.setState({input:{image: imageInput}});

    };



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
                    <input type="file" accept="image/*" required/>
                    <br/>
                    <button onSubmit={this.publishHandler}>Publicera objekt</button>
                </form>
            </div>
        )
    }
}

export default hittat;
