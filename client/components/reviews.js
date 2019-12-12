import React, {Component} from 'react'
import {connect} from 'react-redux'
//----
import {getReviewsByLocation, getReviewsByUser} from '../store/review'
import {getSingleLocation} from '../store/location'
//----
import {Review} from './review'

class Reviews extends Component {
  componentDidMount() {
    if (this.props.match.params === 'myreviews') {
      this.props.getReviewsByUser()
    } else {
      this.props.getReviewsByLocation(this.props.match.params.locId)
      this.props.getSingleLocation(this.props.match.params.locId)
    }
  }

  render() {
    let reviewsToRender =
      this.props.match.params === 'myreviews'
        ? this.props.reviewsByUser
        : this.props.reviewsByLocation
    return reviewsToRender ? (
      <div className="page-top">
        <h2>{this.props.location.name} || Average Rating: TBI</h2>
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
