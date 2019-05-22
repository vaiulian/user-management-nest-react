import React from 'react'
class Register extends React.Component {
  componentDidMount() {
    this.props.history.push('/login')
  }
  render() {
    return <h1>register</h1>
  }
}
export default Register