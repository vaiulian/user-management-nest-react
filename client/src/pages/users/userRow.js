/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

import { userApiActions } from '../../state/actions/userApiActions';

class UserRow extends React.Component {

    render() {

      const { item, dispatch } = this.props;

        return (
          <tr>
            <th scope="row">{item.id}</th>
            <td>{item.userName}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>
              <Link to={`/users/${item.id}`} className="btn btn-primary">edit</Link>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <button className="btn btn-secondary" onClick={() => {dispatch(userApiActions.deleteUser(item.id))}}>delete</button>
            </td>
          </tr>
                
        );
    }
}


export default UserRow;