/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        const { loggedIn, userdata } = this.props;
        const  { user } = userdata || {user: {}};
        return (
          <div>
            {loggedIn && (
              <nav className="navbar navbar-light bg-light">
                <h3 style={{"float": "left"}}>
                Welcome {user.firstName} - {user.lastName}
                </h3>
                <Link to='/login' className="btn btn-primary" style={{"float": "right", "marginTop": "20px"}}>Log Out</Link>
              </nav>
            )}
          </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggedIn, userdata } = state.authentication;
    return {
        loggedIn,
        userdata
    };
}

export default connect(mapStateToProps)(Header);