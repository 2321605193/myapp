import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';
import Home from './routers/Home/index';
import User from './routers/user/index';
import Detail from './routers/detail/index';
import Seat from './routers/seat/Index';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/user" exact component={User}/>
        <Route path="/detail" exact component={Detail}/>
        <Route path="/seat" exact component={Seat}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
