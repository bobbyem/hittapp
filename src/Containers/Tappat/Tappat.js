import React, { PureComponent } from 'react'
import classes from './Tappat.module.css';
import firebase from "../../Firebase";
import Object from "../../Components/Object/Object";
import Aux from "../../HOC/Auxiliary/Auxiliary";
import Spinner from "../../Components/UI/Spinner/Spinner";
import ObjectSmall from "../../Components/ObjectSmall/ObjectSmall";
import ObjectFull from "../../Components/ObjectFull/ObjectFull";
import NoMatchImage from "../../img/QuestionGlass.png";
import Summary from "../../Components/Summary/Summary"
import TappatInstruction from "../../Components/TappatInstruction/TappatInstruction";
const db = firebase.firestore();


export default class Tappat extends PureComponent {
    state ={
        placeholder: "Vad har du tappat?",
        query: "",
        searchCategories: ["Alla", "Elektronik", "Djur", "Kläder", "Övrigt"],
        searchCategorySelected: "Alla",
        foundObjects: null,
        queryMatches: [],
        similarQueryMatches: [],
        selectedObject: null,
        showAllMinis: false,
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
        //Grab query and make lower case
        if (event.target.value !== null) {
            this.setState({query: event.target.value.toLowerCase()});
        }
        else {
            this.setState({query: ""});
        }
        //Remove previous choosen object
        this.setState({selectedObject: null});
        let noMatchObject = {...this.state.noMatchObject};
        noMatchObject.title = event.target.value + "...";
        this.setState({noMatchObject: noMatchObject});
    }

    searchCategoryChangeHandler = (event) => {
        //Grab selected option and overwrite the selected category in state
        this.setState({searchCategorySelected: event.target.value});   
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
        let objects = this.state.foundObjects;
        let category = this.state.searchCategorySelected;
        let filtered = false;

        //Check categories
        if (category === "Alla") {
            console.log(category);
        } else {
            //Filter objects by category
            console.log("filtering by category " + category);
            let filteredObjects = objects.filter(element => element.category === category);
            //Set filtered objects
            objects = filteredObjects;
            filtered = true;
        };

        //Check objects vs query
        if (objects) {

            if (objects && query === "" && filtered) {
                console.log("Should return all " + category);
                matchObjects = objects;
                console.log(matchObjects);
            } else {
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
            }

        // Set Query Matches in State
        this.setState({queryMatches: matchObjects});
        //Clear matchesObjects
        matchObjects = [];
        }

        //In case no objects to search - Server connection lost?
        else {
            alert("Uppkopplingsproblem - Databasen");
        }
  
    }

    render() {

        let object = null;
        let objectsSmall = this.state.showAllMinis ? <Spinner/> : null;
        let objectFull = null;
        let summaryObjects = <Spinner/>;

        //Starting view miniature objects
        if(this.state.foundObjects && !this.state.query && this.state.showAllMinis) {
            objectsSmall = this.state.foundObjects.map((element) => <ObjectSmall key={element.url} url={element.url} title={element.title} alt={element.description} description={element.description} clicked={() => this.selectObjectHandler(element)}/>)
        }
        
        //Found match view
        if (this.state.queryMatches.length > 0) {
            let matchObject = this.state.queryMatches;
            object = matchObject.map((element) => <Object className={classes.Object} key={element.title} title={element.title} 
                amount={element.amount}
                description={element.description}
                url={element.url} clicked={() => this.selectObjectHandler(element)}/>)
        }

        //Show Full Object
        if (this.state.selectedObject) {
            objectFull = <ObjectFull key={this.state.selectedObject.url} url={this.state.selectedObject.url} title={this.state.selectedObject.title} amount={this.state.selectedObject.amount} description={this.state.selectedObject.description} clicked={() => this.setState({selectedObject: null})}/>;
        }
        //Show Summary objects
        if (this.state.foundObjects) {
            let foundObjects = [...this.state.foundObjects];
            summaryObjects = foundObjects.slice(0,8).map((element) => <ObjectSmall key={element.url} url={element.url} title={element.title} amount={element.amount} description={element.description} clicked={() => this.selectObjectHandler(element)}/>);
        }

        return (

        <Aux>
            <div className={classes.Tappat}>
                <div className={classes.SearchBarWrapper}>
                    <div className={classes.SearchBar}>
                        <form onSubmit={this.searchSubmitHandler}>
                            <select className={classes.Selection} onChange={this.searchCategoryChangeHandler}>
                                {this.state.searchCategories.map((element) => <option key={element}>{element}</option>)}
                            </select>


                            <input type="text" placeholder={this.state.placeholder} onChange={this.searchQueryChangeHandler}/> 

                        </form>
                     </div>
                </div>

                
                    
                    {!this.state.selectedObject ? null : objectFull}
                    {!this.state.query && this.state.queryMatches.length === 0 ? null : object}
                    {this.state.query ? null : objectsSmall}
                    <TappatInstruction/>
                    <Summary>{summaryObjects}</Summary>
            </div>
        </Aux>
            
        )
    }
}
