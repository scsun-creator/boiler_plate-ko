import React ,{useState}from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/loginPage/loginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import BoardPage from "./components/views/BoardPage/BoardPage";
import BoardRegistPage from "./components/views/BoardPage/BoardRegistPage";
import BoardUpdatePage from "./components/views/BoardPage/BoardUpdatePage";
import NavBar from "./components/views/NavBar/NavBar";

import Auth from'./hoc/auth';

function App() {

  return (
      <Router>
        <div>

 

          {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
          <NavBar></NavBar>
          <div className="container" id="container">
            <Switch>
              <Route exact path="/" component={Auth(LandingPage,null,true)} />
              <Route exact path="/login" component={Auth(LoginPage,false)}/>
              <Route exact path="/register" component={Auth(RegisterPage,false)}/>
              <Route exact path="/board" component={Auth(BoardPage,true)}/>
              <Route exact path="/board-regist" component={Auth(BoardRegistPage,true)}/>
              <Route exact path="/board-update/:id" component={Auth(BoardUpdatePage,true)}/>
            </Switch>
          </div>
        </div>
      </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
      <div>
        <h2>Home</h2>
      </div>
  );
}

function About() {
  return (
      <div>
        <h2>About</h2>
      </div>
  );
}

function Dashboard() {
  return (
      <div>
        <h2>Dashboard</h2>
      </div>
  );
}

export default App;
