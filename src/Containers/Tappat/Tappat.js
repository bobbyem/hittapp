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
        queryMatch: null,
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
        this.setState({...this.state, queryMatch: null});
        this.setState({...this.state, query: event.target.value.toLowerCase()});
        console.log(this.state.query);
    }

    searchSubmitHandler = (event) => {
        console.log(this.state.query)
        event.preventDefault();
        let query = this.state.query;
        let matchIndex = this.state.foundObjects.findIndex(function (object, index){
            return object.title.toLowerCase() === query;
        });
        
        this.setState({...this.state, queryMatch: matchIndex});
  
    }

    render() {

        let object = <Spinner/>;

        if (this.state.queryMatch !== null && this.state.queryMatch === -1) {
            //No match view
            object = this.state.foundObjects.map((object) => <Object className={classes.Object} key={object.title} title={object.title} 
                amount={object.amount}
                description={object.description}
                url={object.url}/>)
        }

        if (this.state.queryMatch !== null && this.state.queryMatch >=0) {
            //Found match view
            let index = this.state.queryMatch;
            let match = this.state.foundObjects[index];
            object = <Object className={classes.Object} key={match.title} title={match.title} 
                amount={match.amount}
                description={match.description}
                url={match.url}/>;
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
