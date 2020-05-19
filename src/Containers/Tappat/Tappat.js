import React, { PureComponent } from 'react'
import classes from './Tappat.module.css';
import firebase from "../../Firebase";
import Object from "../../Components/Object/Object";
import Aux from "../../HOC/Auxiliary/Auxiliary";
import Spinner from "../../Components/UI/Spinner/Spinner";
import ObjectSmall from "../../Components/ObjectSmall/ObjectSmall";
import ObjectFull from "../../Components/ObjectFull/ObjectFull";
import NoMatchImage from "../../img/QuestionGlass.png";
const db = firebase.firestore();


export default class Tappat extends PureComponent {
    state ={
        placeholder: "Vad har du tappat?",
        query: null,
        foundObjects: null,
        queryMatches: [],
        similarQueryMatches: [],
        selectedObject: null,
        noMatchObject: {
            title: "",
            amount: 0,
            url: NoMatchImage,
            description: "Tyvärr matchar inte din sökning något av våra nuvarande objekt. Prova igen senare."

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
        this.setState({queryMatches: []});
        this.setState({query: event.target.value.toLowerCase()});
        this.setState({selectedObject: null});
        let noMatchObject = {...this.state.noMatchObject};
        noMatchObject.title = event.target.value + "...";
        this.setState({noMatchObject: noMatchObject});
    }

    selectObjectHandler = (element) => {
        //Store clicked element
        if (element) {
            this.setState({selectedObject: element});
        }
        window.scrollTo({top: 0, left: 0, behavior: 'smooth' });;
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

            //If no match push message object
            if (matchObjects.length === 0) {
                matchObjects.push(this.state.noMatchObject);
            }

        // Set Query Matches in State 
        this.setState({queryMatches: matchObjects});
        matchObjects = [];
        }

        //In case no objects to search - Server connection lost?
        else {
            console.log("Uppkopplingsproblem - Databasen");
        }
  
    }

    render() {

        let object = <Spinner/>;
        let objectsSmall = <Spinner/>;
        let objectFull = null;

        //Starting view miniature objects
        if(this.state.foundObjects && !this.state.query) {
            objectsSmall = this.state.foundObjects.map((element) => <ObjectSmall key={element.url} url={element.url} title={element.title} alt={element.description} description={element.description} clicked={() => this.selectObjectHandler(element)}/>)
        }

        if (this.state.queryMatches.length > 0) {
            //Found match view
            let matchObject = this.state.queryMatches;
            object = matchObject.map((element) => <Object className={classes.Object} key={element.title} title={element.title} 
                amount={element.amount}
                description={element.description}
                url={element.url} clicked={() => this.selectObjectHandler(element)}/>)
        }

        //Show Full Object
        if (this.state.selectedObject) {
            objectFull = <ObjectFull url={this.state.selectedObject.url} title={this.state.selectedObject.title} amount={this.state.selectedObject.amount} description={this.state.selectedObject.description} clicked={() => this.setState({selectedObject: null})}/>;
        }

        return (

            <Aux>
                <form onSubmit={this.searchSubmitHandler}>
                    <input type="text" className={classes.SearchBar} placeholder={this.state.placeholder} onChange={this.searchQueryChangeHandler}/>
                </form>
                <div className={classes.Tappat}>
                    {!this.state.selectedObject ? null : objectFull}
                    {!this.state.query ? null : object}
                    {this.state.query ? null : objectsSmall}
                </div>
            </Aux>
            
        )
    }
}
