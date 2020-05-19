import React, { useEffect, useState} from 'react';
import './App.css';
import Layout from "./Components/Layout/Layout";
import Tappat from "./Containers/Tappat/Tappat";
import Hittat from "./Containers/Hittat/Hittat";
import Login from "./Components/UI/Login/Login";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import UserContext from "./Contexts/UserContext";
import CallToAction from "../src/Components/CallToAction/CallToAction";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("UseEffect at app.js");
    document.title = "hittApp - Lost and found";
  })

  return (
    <UserContext.Provider value={{user, setUser}}>
      <Router>
          <div className="App">
            <Layout>
              <Switch>
                <Route path="/" exact component={CallToAction}/>
                <Route path="/tappat" component={Tappat}/>
                <Route path="/hittat" component={user ? Hittat :  Login}/>
                <Route path="/login" component={Login}/>
              </Switch>
            </Layout>
          </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
