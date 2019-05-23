/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom'
import { history } from './utility/history';
import Users from './pages/users'
import User from './pages/user'
import Login from './pages/login'
import Register from './pages/register'
import FourOFours from './pages/404'
import AddUserPage from './pages/add'

import { alertActions } from './state/actions/alertActions';


import './App.css';

import { ProtectComponent } from './components/ProtectComponent';

class App extends Component {

  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
        dispatch(alertActions.clear());
    });
}

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
            <Router history={history} forceRefresh>
              <div style={{ overflow: 'hidden' }}>
                <Switch>
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Register} />
                  <ProtectComponent exact path="/" component={Users} />
                  <ProtectComponent exact path="/users/new" component={AddUserPage} />
                  <ProtectComponent path="/users/:id" component={User} />
                  <Route component={FourOFours} />
                </Switch>
              </div>
            </Router>
            {alert.message &&
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            }
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
