import React from 'react'
import {Link} from 'react-router-dom'

export const Location = props => {
  let location = props.location
  return (
    <div className="location">
      <h2>{location.name}</h2>
      {location.address}
      <br />
      <br />
      {location.notes && (
        <div>
          {location.notes}
          <br />
          <br />
        </div>
      )}
      {/* <Link to={`/reviews/${props.location.id}`}>Reviews | </Link> */}
      {props.userIsApproved && (
        <Link to={`/reviews/${props.location.id}/add`}> Add Review | </Link>
      )}
      <span onClick={() => props.zoomToLocation(location)}>Go To On Map</span>
    </div>
  )
}
