import React, { PureComponent } from 'react'
import classes from './Tappat.module.css';
import firebase from "../../Firebase";
import Object from "../../Components/Object/Object";
import Aux from "../../HOC/Auxiliary/Auxiliary";
import Spinner from "../../Components/UI/Spinner/Spinner";
const db = firebase.firestore();


export default class Tappat extends PureComponent {
    state ={
        placeholder: "Vad har du tappat?",
        query: null,
        foundObjects: null,
        exactQueryMatch: [],
        similarQueryMatches: [],
        noMatchObject: {
            title: "",
            amount: 0,
            url: "",
            description: "Tyvärr matchar inte din sökning någon av våra nuvarande objekt. Prova igen senare."

        }
    }

    componentDidMount() {
        db.collection("hittat").get()
        .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data());
            this.setState({...this.state, foundObjects: data});
            console.log(this.state.foundObjects)
          });
          
    }

    searchQueryChangeHandler = (event) => {
        this.setState({exactQueryMatch: null});
        this.setState({...this.state, query: event.target.value.toLowerCase()});
        console.log(this.state.query);
    }

    searchSubmitHandler = (event) => {
        event.preventDefault();
        let query = this.state.query;
        let matchObjects = [];

        if (this.state.foundObjects) {
            let objects = this.state.foundObjects;
            //Check for exact matches and store
            objects.forEach((element, i) => {
                if (element.title.toLowerCase() === query.toLowerCase()) {
                    matchObjects.push(element);
                }
                return 
            });

            //Push similar results to similarMatchIndexes
            objects.forEach((element, i) => {
                let currentMatch = matchObjects[0];
                if(element !== currentMatch){
                    let firstThreeChars = query.slice(0,3);
                    let elementFirstThreeChars = element.title.slice(0,3).toLowerCase();
                    return elementFirstThreeChars === firstThreeChars ? matchObjects.push(element) : null;}
            });
            console.log(matchObjects);

        // Set Query Matches in State 
        this.setState({exactQueryMatch: matchObjects});
        matchObjects = [];
        }

        //In case no objects to search - Server connection lost?
        else {
            alert("no objects");
        }
  
    }

    render() {

        let object = <Spinner/>;

        if (this.state.exactQueryMatch !== null) {
            //Found match view
            let matchObject = this.state.exactQueryMatch;
            object = matchObject.map((element) => <Object className={classes.Object} key={element.title} title={element.title} 
                amount={element.amount}
                description={element.description}
                url={element.url}/>)
        }

        return (

            <Aux>
                <form onSubmit={this.searchSubmitHandler}>
                    <input type="text" className={classes.SearchBar} placeholder={this.state.placeholder} onChange={this.searchQueryChangeHandler}/>
                </form>
                <div className={classes.Tappat}>
                    {!this.state.query ? null : object}
                </div>
            </Aux>
            
        )
    }
}
