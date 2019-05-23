import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Users from './pages/users'
import User from './pages/user'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import FourOFours from './pages/404'
import './App.css';

import { ProtectComponent } from './components/ProtectComponent';

class App extends Component {

  componentDidMount() {
    window.fetch('/link')
      .then(response => response.json())
      .then(data => console.log(data));
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <ProtectComponent exact path="/" component={Home} />
              <ProtectComponent exact path="/users" component={Users} />
              <ProtectComponent path="/users/:id" component={User} />
              <Route component={FourOFours} />
            </Switch>
          </div>
        </Router>
      </div>
);
  }

}

export default connect()(App);
