import React from 'react'
import {Link} from 'react-router-dom'

export const Location = props => {
  return (
    <div className="location">
      <h2>{props.location.name}</h2>
      {props.location.notes && (
        <div>
          {props.location.notes}
          <br />
          <br />
        </div>
      )}
      <Link to={`/reviews/${props.location.id}`}>Reviews</Link>
    </div>
  )
}
