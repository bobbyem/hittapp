import React from 'react';
import './App.css';
import Layout from "./Components/Layout/Layout";
import Tappat from "./Containers/Tappat/Tappat";
import Hittat from "./Containers/Hittat/Hittat";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  return (

    <Router>
        <div className="App">
          <Layout>
            <Switch>
              <Route path="/" exact component={Tappat}/>
              <Route path="/tappat" component={Tappat}/>
              <Route path="/hittat" component={Hittat}/>
            </Switch>
          </Layout>
        </div>
    </Router>
  );
}

export default App;
