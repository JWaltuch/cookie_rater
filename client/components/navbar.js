import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div className="header">
    <img src="https://lh3.googleusercontent.com/proxy/KOZQZG3XDaLzOsA8caPV3IIw9V2KjMDV6iV0Rop5mid2YBACRpo2Ap-UpU5gBEfT1VBm1S6sehAPMSRYSJufIrl_5R_vGZ9hgeXbzrV-2duQLh5Umw" />
    <Link to="/home" className="logo">
      <h1>XCOOKIE RATERX</h1>
    </Link>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/reviews/me">My Reviews</Link>
          {isAdmin && <Link to="/users">Users</Link>}
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.currentUser.id,
    isAdmin: state.user.currentUser.type === 'admin'
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
