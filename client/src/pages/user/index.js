import React from 'react';
import PropTypes from 'prop-types';

const User = ({match}) => {
  const {
    params,
  } = match;
  return (
    <h1>
      User
      {params.id}
    </h1>
  );
};

User.propTypes = {
  match: PropTypes.shape.isRequired,
}
export default User
;