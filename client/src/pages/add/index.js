/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { alertActions } from '../../state/actions/alertActions';
import { userApiActions } from '../../state/actions/userApiActions';

class AddUserPage extends React.Component {

    constructor(props) {
    super(props);

    this.state = {
        userName: '',
        firstName: '',
        lastName: '',
        password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

    handleChange(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    }

    handleSubmit(e) {
      e.preventDefault();
      const { userName, firstName, lastName, password } = this.state;
      const { dispatch } = this.props;

      if(userName.length >= 1 && firstName.length >= 1 && lastName.length >= 1 ) {
          if (password.length >= 5) {
              dispatch(userApiActions.addUser(this.state));
          } else {
              dispatch(alertActions.error("Password must be at least 5 char"));
          }
      } else {
            dispatch(alertActions.error("Complete all fields"));
      }
    }

    render() {
      const { userName, firstName, lastName, password } = this.state;

        return (
          <div className="col-md-10 col-md-offset-1">
            <h2>
              New User
            </h2>
            <br />
            <br />
            <form onSubmit={this.handleSubmit}>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Username</label>
                <div className="col-sm-10">
                  <input type="username" name="userName" className="form-control" placeholder="Username" value={userName} onChange={this.handleChange} />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Firstname</label>
                <div className="col-sm-10">
                  <input type="firstname" name="firstName" className="form-control" placeholder="Firstname" value={firstName} onChange={this.handleChange} />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Lastname</label>
                <div className="col-sm-10">
                  <input type="lastname" name="lastName" className="form-control" placeholder="Lastname" value={lastName} onChange={this.handleChange} />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
                  <input type="password" className="form-control" name="password" placeholder="Password" value={password} onChange={this.handleChange} />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-10">
                  <button type="submit" className="btn btn-primary">Save</button>
                </div>
              </div>
            </form>
          </div>
        );
    }
}

export default connect()(AddUserPage);