import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
//----
import {getLocations} from '../store/location'
//---
import {Location} from './location'
//---
import Map from 'pigeon-maps'
import Marker from 'pigeon-marker'
import Overlay from 'pigeon-overlay'

/**
 * COMPONENT
 */
class UserHome extends Component {
  constructor(props) {
    super(props)
    this.state = {mapLatitude: 40.739936, mapLongitude: -73.995801}
  }
  componentDidMount() {
    this.props.getLocations()
  }

  render() {
    return (
      <div className="page-top">
        <h3>Welcome, {this.props.email}</h3>
        <div className="container">
          <div className="locations">
            {this.props.locations ? (
              this.props.locations.map(location => (
                <Location key={location.id} location={location} />
              ))
            ) : (
              <div>Loading...</div>
            )}
          </div>
          <Map
            boxClassname="map"
            center={[this.state.mapLatitude, this.state.mapLongitude]}
            zoom={14}
            width={600}
            height={450}
          >
            {this.props.locations &&
              this.props.locations.map(location => (
                <Overlay
                  key={location.id}
                  anchor={[location.latitude, location.longitude]}
                >
                  <img
                    src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png"
                    width={30}
                    height={30}
                    alt=""
                  />
                </Overlay>
              ))}
            {/* <Marker anchor={[50.874, 4.6947]} payload={1} /> */}
          </Map>
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
    locations: state.location.allLocations
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
