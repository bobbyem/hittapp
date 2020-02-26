import React, { PureComponent } from 'react'
import classes from './Tappat.module.css';
import firebase from "../../Firebase";

const db = firebase.firestore();

export default class Tappat extends PureComponent {
    state ={
        placeholder: "Vad har du ätit?",
        query: null,
        speed: 15,
        foundObject: null
    }




    componentDidMount() {
        db.collection("hittat").get()
        .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data());
            this.setState({foundObject: data});
            console.log(this.state.foundObject)
          });
          
    }


    searchQueryChangeHandler = (event) => {
        this.setState({query: event.target.value});
        console.log(event.target.value);
    }

    searchSubmitHandler = () => {
        alert("Du har tappat " + this.state.query);
    }

    render() {

        return (
            <div className={classes.Tappat}>
            <h1>Tappat {this.state.speed}</h1>
                <form onSubmit={this.searchSubmitHandler}>
                    <input type="text" className={classes.SearchBar} placeholder={this.state.placeholder} onChange={this.searchQueryChangeHandler}/>
                </form>
                
            </div>
        )
    }
}
