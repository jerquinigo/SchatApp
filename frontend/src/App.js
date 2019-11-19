import React from 'react';
import {Route, Switch} from "react-router-dom"
import MainChat from "./Components/MainChat.js"
import MainSignupLoginForm from "./Components/MainSignupLoginForm.js"
import './App.css';

function App() {
  return (
    <div className="App">
      <MainChat/>
      <MainSignupLoginForm/>
    </div>
  );
}

export default App;
