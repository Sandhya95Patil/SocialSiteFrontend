import React from 'react';
import './App.css';
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Dashboard from "./Pages/Dashboard";
import { BrowserRouter as Router, Route } from 'react-router-dom';


function App() {
  return (
    <div>
      <Router>
        <Route path="/" exact={true} component={SignIn} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/dashboard" component={Dashboard}/>
      </Router>
    </div>
  );
}

export default App;
