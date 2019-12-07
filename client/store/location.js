import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_LOCATIONS = 'GOT_LOCATIONS'
const CREATED_LOCATION = 'CREATED_LOCATION'
const UPDATED_LOCATION = 'UPDATED_LOCATION'

/**
 * INITIAL STATE
 */
const locations = []

/**
 * ACTION CREATORS
 */
const gotLocations = newLocations => ({type: GOT_LOCATIONS, newLocations})
const createdLocations = location => ({type: CREATED_LOCATION, location})
const updatedLocations = location => ({type: UPDATED_LOCATION, location})

/**
 * THUNK CREATORS
 */
export const getLocations = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/locations')
    dispatch(gotLocations(data))
  } catch (err) {
    console.error(err)
  }
}

export const createLocation = locationInfo => async dispatch => {
  try {
    const {data} = await axios.post('/api/locations', locationInfo)
    dispatch(createdLocations(data))
  } catch (err) {
    console.error(err)
  }
}

export const updateLocation = (locId, locationInfo) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/locations/${locId}`, locationInfo)
    dispatch(updatedLocations(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = locations, action) {
  switch (action.type) {
    case GOT_LOCATIONS:
      return action.newLocations
    case CREATED_LOCATION: {
      let newLocations = [...state]
      newLocations.push(action.location)
      return newLocations
    }
    case UPDATED_LOCATION: {
      let newLocations = state.locations.filter(
        location => location.id !== action.location.id
      )
      return newLocations
    }
    default:
      return state
  }
}
