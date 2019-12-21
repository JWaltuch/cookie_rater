import React, {Component} from 'react'
import {connect} from 'react-redux'
//----
import {getUsers, updateUsers} from '../store/user'

class Users extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.getUsers()
  }

  handleClick(type, id) {
    this.props.updateUsers(id, type)
  }

  //display list of users
  //display approve button for unapproved users
  //display unapprove for other users?
  //onclick, approve button approves users
  //takes a req.body with a type, and a userid in params
  render() {
    let userIsAdmin = this.props.userIsAdmin
    return userIsAdmin ? (
      <div className="page-top">
        <h2>Users</h2>
        {this.props.allUsers.map(user => (
          <div key={user.id}>
            {user.username}
            {user.type === null && (
              <button onClick={() => this.handleClick('approved', user.id)}>
                Approve
              </button>
            )}
            {user.type === 'approved' && (
              <button onClick={() => this.handleClick(null, user.id)}>
                Unapprove
              </button>
            )}
          </div>
        ))}
      </div>
    ) : (
      <div>Loading</div>
    )
  }
}

const mapState = state => {
  return {
    userIsAdmin: state.user.currentUser.type === 'admin',
    allUsers: state.user.allUsers
  }
}

const mapDispatch = dispatch => {
  return {
    getUsers: () => dispatch(getUsers()),
    updateUsers: (id, type) => dispatch(updateUsers(id, type))
  }
}

export default connect(mapState, mapDispatch)(Users)
