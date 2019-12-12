import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_REVIEWS_BY_USER = 'GOT_REVIEWS_BY_USER'
const GOT_REVIEWS_BY_LOCATION = 'GOT_REVIEWS_FOR_LOCATION'
const CREATED_REVIEW = 'CREATED_REVIEW'
const DESTROYED_REVIEW = 'DESTROYED_REVIEW'

/**
 * INITIAL STATE
 */
const reviews = {reviewsByUser: [], reviewsByLocation: []}

/**
 * ACTION CREATORS
 */
const gotReviewsByUser = allReviews => ({type: GOT_REVIEWS_BY_USER, allReviews})
const gotReviewsByLocation = allReviews => ({
  type: GOT_REVIEWS_BY_LOCATION,
  allReviews
})
const createdReview = review => ({type: CREATED_REVIEW, review})
const destroyedReview = review => ({type: DESTROYED_REVIEW, review})

/**
 * THUNK CREATORS
 */
export const getReviewsByUser = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users/reviews')
    dispatch(gotReviewsByUser(data))
  } catch (err) {
    console.error(err)
  }
}

export const getReviewsByLocation = locId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/reviews/${locId}`)
    dispatch(gotReviewsByLocation(data))
  } catch (err) {
    console.error(err)
  }
}

export const createReview = reviewBody => async dispatch => {
  try {
    const {data} = await axios.post('/api/reviews', reviewBody)
    dispatch(createdReview(data))
    history.push(`/reviews/${reviewBody.locationId}`)
  } catch (err) {
    console.error(err)
  }
}

export const destroyReview = id => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/reviews/${id}`)
    dispatch(destroyedReview(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = reviews, action) {
  switch (action.type) {
    case GOT_REVIEWS_BY_USER:
      return {...state, reviewsByUser: action.allReviews}
    case GOT_REVIEWS_BY_LOCATION:
      return {...state, reviewsByLocation: action.allReviews}
    case CREATED_REVIEW: {
      let newReviewsByUser = [...state.reviewsByUser]
      let newReviewsByLocation = [...state.reviewsByLocation]
      newReviewsByUser.push(action.review)
      newReviewsByLocation.push(action.review)
      return {
        reviewsByUser: newReviewsByUser,
        reviewsByLocation: newReviewsByLocation
      }
    }
    case DESTROYED_REVIEW: {
      let newReviewsByUser = state.reviewsByUser.filter(
        review => review.id !== action.review.id
      )
      let newReviewsByLocation = state.reviewsByLocation.filter(
        review => review.id !== action.review.id
      )
      return {
        reviewsByUser: newReviewsByUser,
        reviewsByLocation: newReviewsByLocation
      }
    }
    default:
      return state
  }
}
