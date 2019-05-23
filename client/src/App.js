/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom'
import { history } from './utility/history';
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
    const { alert } = this.props;
    return (
      <div className="App">
        <div className="container">
          <div className="col-sm-12">
            {alert.message &&
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            }
            <Router history={history} forceRefresh>
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
        </div>
      </div>
);
  }

}

function mapStateToProps(state) {
  const { alert } = state;
  return {
      alert
  };
}

export default connect(mapStateToProps)(App);
