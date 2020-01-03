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
    this.state = {
      mapLatitude: 40.739936,
      mapLongitude: -73.995801,
      zoom: 13,
      clickedLocation: ''
    }
    this.zoomIn = this.zoomIn.bind(this)
    this.zoomOut = this.zoomOut.bind(this)
    this.zoomToLocation = this.zoomToLocation.bind(this)
    this.handleMarkerClick = this.handleMarkerClick.bind(this)
  }
  componentDidMount() {
    this.props.getLocations()
  }

  zoomIn = () => {
    let currentZoom = this.state.zoom
    this.setState({
      zoom: Math.min(currentZoom + 1, 18)
    })
  }

  zoomOut = () => {
    let currentZoom = this.state.zoom
    this.setState({
      zoom: Math.max(currentZoom - 1, 1)
    })
  }

  zoomToLocation = location => {
    this.setState({
      mapLatitude: location.latitude,
      mapLongitude: location.longitude,
      zoom: 18,
      clickedLocation: `${location.name} | ${location.address}`
    })
  }

  handleMarkerClick = (locName, locAddress) => {
    this.setState({clickedLocation: `${locName} | ${locAddress}`})
  }

  render() {
    return (
      <div className="page-top">
        <h3>Welcome, {this.props.email}</h3>
        <div className="container">
          <div className="panel">
            {this.props.locations ? (
              this.props.locations.map(location => (
                <Location
                  key={location.id}
                  location={location}
                  zoomToLocation={this.zoomToLocation}
                  userIsApproved={this.props.userIsApproved}
                />
              ))
            ) : (
              <div>Loading...</div>
            )}
          </div>
          <div className="map-panel">
            <div>{this.state.clickedLocation}</div>
            <Map
              center={[this.state.mapLatitude, this.state.mapLongitude]}
              zoom={this.state.zoom}
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
                      onClick={() =>
                        this.handleMarkerClick(location.name, location.address)
                      }
                    />
                  </Overlay>
                ))}
              {/* <Marker anchor={[50.874, 4.6947]} payload={1} /> */}
            </Map>
            <button onClick={() => this.zoomIn()}>Zoom In</button>
            <button onClick={() => this.zoomOut()}>Zoom Out</button>
          </div>
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
    email: state.user.currentUser.email,
    userIsApproved:
      state.user.currentUser.type === 'approved' ||
      state.user.currentUser.type === 'admin',
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
