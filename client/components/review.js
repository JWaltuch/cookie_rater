import React from 'react'

export const Review = props => {
  return (
    <div className="location">
      <h2>{props.location.name}</h2>
      <div>Rating: {props.review.rating}</div>
      <div>Reason: {props.review.reason}</div>
    </div>
  )
}
