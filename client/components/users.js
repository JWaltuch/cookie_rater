import React, {Component} from 'react'
import {connect} from 'react-redux'
//----
import {getReviewsByLocation, getReviewsByUser} from '../store/review'
import {getSingleLocation} from '../store/location'

class Users extends Component {
  componentDidMount() {
    //get users
  }

  //display list of users
  //display approve button for unapproved users
  //display unapprove for other users?
  //onclick, approve button approves users
  //takes a req.body with a type, and a userid in params
  render() {
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
      state.user.currentUser.type === 'approved' ||
      state.user.currentUser.type === 'admin',
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

export default connect(mapState, mapDispatch)(Users)
