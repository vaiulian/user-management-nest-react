/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import UserRow from './userRow';

import { userApiActions } from '../../state/actions/userApiActions';

class UsersPage extends React.Component {

    componentDidMount = () => {
      const { dispatch } = this.props;
      dispatch(userApiActions.getAllUsers());
    }

    render() {

      const { users, dispatch } = this.props;

        return (
          <div className="col-md-10 col-md-offset-1">
            <h2>Users</h2>
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Username</th>
                  <th scope="col">Firstname</th>
                  <th scope="col">Lastname</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((item, index) => (
                  <UserRow key={index} item={item} dispatch={dispatch} />
                ))}
              </tbody>
            </table>
            <Link to='/users/new' className="btn btn-primary">Add User</Link>
          </div>
        );
    }
}

function mapStateToProps(state) {
    const { users } = state.usersApi;
    return {
      users
    };
}

export default connect(mapStateToProps)(UsersPage);