import React from 'react'
import {Link} from 'react-router-dom'

export const Location = props => {
  let location = props.location
  return (
    <div className="location">
      <Link to={`/reviews/${props.location.id}`}>
        <h2>{location.name}</h2>
      </Link>
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
        <Link to={`/reviews/${props.location.id}/add`}>
          {' '}
          <button>Add Review </button>
        </Link>
      )}
      <button onClick={() => props.zoomToLocation(location)}>
        Zoom To Location
      </button>
    </div>
  )
}
