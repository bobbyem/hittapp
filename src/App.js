import React from 'react';
import './App.css';
import Layout from "./Components/Layout/Layout";
import Tappat from "./Containers/Tappat/Tappat";

function App() {
  return (
    <div className="App">
      <Layout>
      <Tappat/>
      </Layout>
    </div>
  );
}

export default App;
