import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createReview} from '../store/review'
import {getSingleLocation} from '../store/location'

/**
 * COMPONENT
 */
class ReviewForm extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit = event => {
    event.preventDefault()
    let reviewBody = {
      rating: event.target.rating.value,
      reason: event.target.reason.value,
      locationId: this.props.match.params.locId
    }
    this.props.createReview(reviewBody)
  }

  componentDidMount() {
    this.props.getSingleLocation(this.props.match.params.locId)
  }

  render() {
    return (
      <div className="page-top">
        <h2>Add Review For {this.props.location.name}:</h2>
        <form
          className="review-form"
          onSubmit={event => this.handleSubmit(event)}
          name={name}
        >
          <div>
            <label htmlFor="rating">Rating: </label>
            <select name="rating" id="rating">
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
          </div>
          <div>
            <label htmlFor="reason">Justify Your Rating:</label>
            <textarea name="reason" id="reason" />
          </div>
          <div className="form-button">
            <button type="submit">Submit</button>
          </div>
          {this.props.error &&
            this.props.error.response && (
              <div> {this.props.error.response.data} </div>
            )}
        </form>
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  return {
    error: state.review.error,
    match: ownProps.match,
    location: state.location.singleLocation
  }
}

const mapDispatch = dispatch => {
  return {
    createReview: reviewBody => dispatch(createReview(reviewBody)),
    getSingleLocation: locId => dispatch(getSingleLocation(locId))
  }
}

export default connect(mapState, mapDispatch)(ReviewForm)
