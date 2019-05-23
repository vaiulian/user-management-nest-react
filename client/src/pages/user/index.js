/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import { alertActions } from '../../state/actions/alertActions';
import { userApiActions } from '../../state/actions/userApiActions';

class UserPage extends React.Component {

    constructor(props) {
    super(props);

    this.state = {
        password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

    componentDidMount = () => {
      const { dispatch, match } = this.props;
      dispatch(userApiActions.getUser(match.params.id));
    }

    handleChange(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    }

    handleSubmit(e) {
      e.preventDefault();
      const { password } = this.state;
      const { user, dispatch } = this.props;

      const userToUpdate = Object.assign({}, user);
      userToUpdate.password = password;

      if (password.length >= 5) {
          dispatch(userApiActions.updateUser(userToUpdate));
      } else {
          dispatch(alertActions.error("Password must be at least 5 char"));
      }
    }

    render() {
      const { password } = this.state;
      const { user } = this.props;
      const { userName, firstName, lastName } = user;

        return (
          <div className="col-md-10 col-md-offset-1">
            <h2>
              User
              #
              {user.id}
            </h2>
            <br />
            <br />
            <form onSubmit={this.handleSubmit}>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Username</label>
                <div className="col-sm-10">
                  <input disabled type="username" className="form-control" placeholder="Username" value={userName} />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Firstname</label>
                <div className="col-sm-10">
                  <input disabled type="firstname" className="form-control" placeholder="Firstname" value={firstName} />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Lastname</label>
                <div className="col-sm-10">
                  <input disabled type="lastname" className="form-control" placeholder="Lastname" value={lastName} />
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
                  <button type="submit" className="btn btn-primary">Update</button>
                </div>
              </div>
            </form>
          </div>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state.usersApi;
    return {
      user
    };
}

export default connect(mapStateToProps)(UserPage);