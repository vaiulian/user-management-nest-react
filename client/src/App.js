import React, { Component } from 'react';
import './App.css';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Users from './components/users'
import User from './components/user'
import Home from './components/home'
import Login from './components/login'
import Register from './components/register'
import FourOFours from './components/404'

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetch('/link')
      .then(response => response.json())
      .then(data => console.log(data));
  }

  render() {
    return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route exact path="/users" component={Users} />
            <Route path="/users/:id" component={User} />
            <Route component={FourOFours} />
          </Switch>
        </div>
      </Router>
    </div>);
  }

}

export default App;
