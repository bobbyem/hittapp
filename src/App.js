import React from 'react';
import './App.css';
import Layout from "./Components/Layout/Layout";
import Tappat from "./Containers/Tappat/Tappat";
import Hittat from "./Containers/Hittat/Hittat";

function App() {
  return (
    <div className="App">
      <Layout>
      <Tappat/>
      <Hittat/>
      </Layout>
    </div>
  );
}

export default App;
