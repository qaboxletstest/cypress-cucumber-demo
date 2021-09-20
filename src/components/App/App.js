import React from 'react';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import ToDoComp from '../ToDo/ToDoComp';
import Home from '../Home/Home';
import Login from '../Login/Login';
import useToken from './useToken';


function App() {

  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <Header />
      <BrowserRouter>
        <Link to="/home">
          <button id="home" className="btn">Go to home</button>
        </Link>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/todo">
            <ToDoComp />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;