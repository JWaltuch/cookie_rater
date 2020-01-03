import React from 'react'

export const Review = props => {
  return (
    <div className="location">
      <div>Rating: {props.review.rating}</div>
      <div>Reason: {props.review.reason}</div>
      {props.userIsAdmin && (
        <button onClick={() => props.destroyReview(props.review.id)}>
          Delete Review
        </button>
      )}
    </div>
  )
}
