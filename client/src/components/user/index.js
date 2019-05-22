import React from 'react'
class User extends React.Component {
  render() {
    const { params } = this.props.match
    return <h1>User {params.id}</h1>
  }
}
export default User