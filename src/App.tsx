import React, {Component} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import "./App.css";
import User from "./components/User-dashboard";
import Login from './components/Login/login';
import Form from "./Form";
import AdminForm from "./AdminForm";
import Admin from "./components/Admin-dashboard";
import Agent from "./components/Agent-Dashboard";
import Analytics from "./components/Analytics";
import CreateComment from './components/AdminRequest'
import RequestDetails from './components/requestCard'
import AddComment from "./comment"
import Update from './components/UpdateForm'

const App = () => {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/admin" exact component={document.cookie? Admin : Login} />
          <Route path="/analytics" exact component={Analytics} />
          <Route path="/user" exact component={document.cookie? User : Login} />
          <Route path="/agent" component={document.cookie? Agent : Login} />
          <Route path="/request" component={Form} />
          <Route path="/adminrequest" component={AdminForm} />
          <Route path="/adminrequestdetails" exact component={CreateComment} />
          <Route path="/comment" component={AddComment} />
          <Route path="/update" exact component={Update} />

        </Switch>
      </Router>
    </div>
  );
};


export default App;
