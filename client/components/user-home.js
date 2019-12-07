import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
//----
import {getLocations} from '../store/location'
//---
import {Location} from './location'

/**
 * COMPONENT
 */
export class UserHome extends Component {
  async componentDidMount() {
    await this.props.getLocations()
  }

  render() {
    return (
      <div>
        <h3>Welcome, {this.props.email}</h3>
        <div>
          {this.props.locations ? (
            this.props.locations.map(location => (
              <Location key={location.id} location={location} />
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    locations: state.locations
  }
}

const mapDispatch = dispatch => {
  return {
    getLocations: () => {
      dispatch(getLocations())
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
