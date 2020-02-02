import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import ImageScoring from "./ImageScoring";
import References from "./References";
import ImageForm from "./ImageForm";
import LoginForm from "./LoginForm";
import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
        <Router>
          <Switch>
            <Route exact path="/" component={ImageForm} />
            <Route exact path="/results" component={LoginForm} />
          </Switch>
        </Router>
  );
}

export default App;
