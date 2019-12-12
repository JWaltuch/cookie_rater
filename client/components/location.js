import React from 'react'
import {Link} from 'react-router-dom'

export const Location = props => {
  let location = props.location
  return (
    <div className="location" onClick={() => props.zoomToLocation(location)}>
      <h2>{location.name}</h2>
      {location.notes && (
        <div>
          {location.notes}
          <br />
          <br />
        </div>
      )}
      <Link to={`/reviews/${props.location.id}`}>Reviews </Link>
      {props.userIsApproved && (
        <Link to={`/reviews/${props.location.id}/add`}> Add Review</Link>
      )}
    </div>
  )
}
