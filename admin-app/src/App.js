// CSS file
import React from "react";
import "./App.css";
// React router dom helps to find the router pages of elements
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import elements from components and containers
import Home from "./containers/Home/index";
import Signup from "./containers/Signup/index";
import Signin from "./containers/Signin/index";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/signin" component={Signin}></Route>
          <Route path="/signup" component={Signup}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
