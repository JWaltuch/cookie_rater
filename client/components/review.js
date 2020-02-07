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
      {/* {props.userId === props.review.userId && (
        <button onClick={() => props.editReview(props.review.id)}>
          Edit Review
        </button>
      )} */}
    </div>
  )
}
