import React from 'react'
import {Link} from 'react-router-dom'

export const Location = props => {
  return (
    <div>
      <h2>{props.location.name}</h2>
      {props.location.notes}
      <Link to={`/reviews/${props.location.id}`}>Reviews</Link>
    </div>
  )
}
