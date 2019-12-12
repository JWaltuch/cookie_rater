import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
//----
import {getReviewsByLocation, getReviewsByUser} from '../store/review'
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

  render() {
    let reviewsToRender =
      this.props.match.path === '/reviews/me'
        ? this.props.reviewsByUser
        : this.props.reviewsByLocation
    let title =
      this.props.match.path === '/reviews/me'
        ? 'My Reviews'
        : `${this.props.location.name} || Average Rating: TBI`
    return reviewsToRender ? (
      <div className="page-top">
        <h2>{title}</h2>
        {this.props.userIsApproved &&
          this.props.match.path !== '/reviews/me' && (
            <Link to={`/reviews/${this.props.location.id}/add`}>
              Add Review
            </Link>
          )}
        {reviewsToRender.map(review => (
          <Review key={review.id} review={review} />
        ))}
      </div>
    ) : (
      <div>Loading</div>
    )
  }
}

const mapState = (state, ownProps) => {
  return {
    userIsApproved:
      state.user.type === 'approved' || state.user.type === 'admin',
    reviewsByUser: state.review.reviewsByUser,
    reviewsByLocation: state.review.reviewsByLocation,
    location: state.location.singleLocation,
    match: ownProps.match
  }
}

const mapDispatch = dispatch => {
  return {
    getReviewsByUser: () => dispatch(getReviewsByUser()),
    getReviewsByLocation: locId => dispatch(getReviewsByLocation(locId)),
    getSingleLocation: locId => dispatch(getSingleLocation(locId))
  }
}

export default connect(mapState, mapDispatch)(Reviews)
