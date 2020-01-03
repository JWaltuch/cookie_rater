import React from 'react'
//---
import Map from 'pigeon-maps'
import Overlay from 'pigeon-overlay'

export const MapPanel = props => {
  return (
    <div className="map-panel">
      <div>{props.clickedLocation}</div>
      <Map center={[props.mapLatitude, props.mapLongitude]} zoom={props.zoom}>
        {props.locations &&
          props.locations.map(location => (
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
                  props.handleMarkerClick(location.name, location.address)
                }
              />
            </Overlay>
          ))}
      </Map>
      <button onClick={() => props.zoomIn()}>Zoom In</button>
      <button onClick={() => props.zoomOut()}>Zoom Out</button>
    </div>
  )
}
