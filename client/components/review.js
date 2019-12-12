import React from 'react'

export const Review = props => {
  return (
    <div className="location">
      <div>Rating: {props.review.rating}</div>
      <div>Reason: {props.review.reason}</div>
    </div>
  )
}
