import React from 'react'

export const Review = props => {
  const {review, destroyReview, userIsAdmin} = props
  return (
    <div className="location">
      {review.location && <h3>{review.location.name}</h3>}
      <div>Rating: {review.rating}</div>
      <div>Reason: {review.reason}</div>
      {userIsAdmin && (
        <button onClick={() => destroyReview(props.review.id)}>
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
