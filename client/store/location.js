import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_LOCATIONS = 'GOT_LOCATIONS'
const GOT_SINGLE_LOCATION = 'GOT_SINGLE_LOCATION'
const CREATED_LOCATION = 'CREATED_LOCATION'
const UPDATED_LOCATION = 'UPDATED_LOCATION'

/**
 * INITIAL STATE
 */
const locations = {allLocations: [], singleLocation: []}

/**
 * ACTION CREATORS
 */
const gotLocations = newLocations => ({type: GOT_LOCATIONS, newLocations})
const gotSingleLocation = location => ({type: GOT_SINGLE_LOCATION, location})
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

export const getSingleLocation = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/locations/${id}`)
    dispatch(gotSingleLocation(data))
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
      return {...state, allLocations: action.newLocations}
    case GOT_SINGLE_LOCATION:
      return {...state, singleLocation: action.location}
    case CREATED_LOCATION: {
      let newLocations = [...state]
      newLocations.push(action.location)
      return {...state, allLocations: newLocations}
    }
    case UPDATED_LOCATION: {
      let newLocations = state.locations.filter(
        location => location.id !== action.location.id
      )
      return {...state, allLocations: newLocations}
    }
    default:
      return state
  }
}
