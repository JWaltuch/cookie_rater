import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
//----
import {
  getReviewsByLocation,
  getReviewsByUser,
  destroyReview
} from '../store/review'
import {getSingleLocation} from '../store/location'
//----
import {Review} from './review'

class Reviews extends Component {
  componentDidMount() {
    if (this.props.match.path === '/reviews/me') {
      this.props.getReviewsByUser()
    } else {
      this.props.getReviewsByLocation(this.props.match.params.locId)
      this.props.getSingleLocation(this.props.match.params.locId)
    }
  }

  getReviewsToRender() {
    return this.props.match.path === '/reviews/me'
      ? this.props.reviewsByUser
      : this.props.reviewsByLocation
  }

  getAvgRating(reviewsToRender) {
    return (
      reviewsToRender.reduce((accumulator, review) => {
        return accumulator + review.rating
      }, 0) / reviewsToRender.length
    )
  }

  render() {
    //Determine if we are rendering user reviews or location reviews
    //Load appropriate reviews
    let reviewsToRender = this.getReviewsToRender()
    let avgRating = 0
    //Set review average if this is a location review page
    if (this.props.reviewsByLocation.length > 0) {
      avgRating = this.getAvgRating(reviewsToRender)
    }
    //Set title based on type of review page
    let title =
      this.props.match.path === '/reviews/me'
        ? 'My Reviews'
        : `${this.props.location.name} || Average Rating: ${avgRating.toFixed(
            2
          )}`
    return this.props.userIsApproved ? (
      <div className="page-top">
        <h2>{title}</h2>
        {this.props.userIsApproved &&
          this.props.match.path !== '/reviews/me' && (
            <Link to={`/reviews/${this.props.location.id}/add`}>
              Add Review
            </Link>
          )}
        {reviewsToRender.length > 0 ? (
          reviewsToRender.map(review => (
            <Review
              key={review.id}
              review={review}
              destroyReview={this.props.destroyReview}
              userIsAdmin={this.props.userIsAdmin}
              userId={this.props.userId}
            />
          ))
        ) : (
          <div>
            Visit some <Link to="/">locations</Link> and leave a review!
          </div>
        )}
      </div>
    ) : (
      <div className="page-top">
        <br />
        <br />
        <div>Pending approval...</div>
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  return {
    userIsApproved:
      state.user.currentUser.type === 'approved' ||
      state.user.currentUser.type === 'admin',
    userIsAdmin: state.user.currentUser.type === 'admin',
    reviewsByUser: state.review.reviewsByUser,
    reviewsByLocation: state.review.reviewsByLocation,
    location: state.location.singleLocation,
    match: ownProps.match,
    userId: state.user.currentUser.id
  }
}

const mapDispatch = dispatch => {
  return {
    getReviewsByUser: () => dispatch(getReviewsByUser()),
    getReviewsByLocation: locId => dispatch(getReviewsByLocation(locId)),
    getSingleLocation: locId => dispatch(getSingleLocation(locId)),
    destroyReview: locId => dispatch(destroyReview(locId))
  }
}

export default connect(mapState, mapDispatch)(Reviews)
