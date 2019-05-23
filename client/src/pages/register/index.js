/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { alertActions } from '../../state/actions/alertActions';
import { userAuthActions } from '../../state/actions/authActions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            firstName: '',
            lastName: '',
            password: '',
            submitted: false
        };

        // reset login status
        this.props.dispatch(userAuthActions.logout());

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { userName, firstName, lastName, password } = this.state;
        const { dispatch } = this.props;

        if(userName.length >= 1 && firstName.length >= 1 && lastName.length >= 1 ) {
          if (password.length >= 5) {
              dispatch(userAuthActions.register(userName, firstName, lastName,password));
          } else {
              dispatch(alertActions.error("Password must be at least 5 char"));
          }
      } else {
            dispatch(alertActions.error("Complete all fields"));
      }
    }

    render() {
        const { loggingIn } = this.props;
        const { userName, firstName, lastName, password, submitted } = this.state;
        return (
          <div className="col-md-6 col-md-offset-3">
            <h2>Register</h2>
            <form name="form" onSubmit={this.handleSubmit}>
              <div className={`form-group${  submitted && !userName ? ' has-error' : ''}`}>
                <label htmlFor="userName">username</label>
                <input type="text" className="form-control" name="userName" value={userName} onChange={this.handleChange} />
                {submitted && !userName &&
                <div className="help-block">username is required</div>
                }
              </div>
              <div className={`form-group${  submitted && !firstName ? ' has-error' : ''}`}>
                <label htmlFor="firstName">firstname</label>
                <input type="text" className="form-control" name="firstName" value={firstName} onChange={this.handleChange} />
                {submitted && !firstName &&
                <div className="help-block">firstname is required</div>
                }
              </div>
              <div className={`form-group${  submitted && !lastName ? ' has-error' : ''}`}>
                <label htmlFor="lastName">lastname</label>
                <input type="text" className="form-control" name="lastName" value={lastName} onChange={this.handleChange} />
                {submitted && !lastName &&
                <div className="help-block">lastname is required</div>
                }
              </div>
              <div className={`form-group${  submitted && !password ? ' has-error' : ''}`}>
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                {submitted && !password &&
                <div className="help-block">Password is required</div>
                }
              </div>
              <div className="form-group">
                <button className="btn btn-primary">Sign Up</button>
                {loggingIn &&
                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                }
                <br />
                <br />
                <Link to='/login' className="btn btn-primary">Log In</Link>
              </div>
            </form>
          </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

export default connect(mapStateToProps)(RegisterPage);