import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const GOT_USERS = 'GOT_USERS'
const UPDATED_USERS = 'UPDATED_USERS'
const REMOVE_USER = 'REMOVE_USER'
const DISPLAY_ERROR = 'DISPLAY_ERROR'

/**
 * INITIAL STATE
 */
const defaultUser = {currentUser: [], allUsers: [], error: {}}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const gotUsers = users => ({type: GOT_USERS, users})
const updatedUsers = updatedUser => ({type: UPDATED_USERS, updatedUser})
const removeUser = () => ({type: REMOVE_USER})
const displayError = error => ({type: DISPLAY_ERROR, error})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method, username) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password, username})
  } catch (authError) {
    return dispatch(displayError(authError))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const getUsers = () => async dispatch => {
  try {
    let {data} = await axios.get('/api/users')
    dispatch(gotUsers(data))
  } catch (error) {
    console.error(error)
  }
}

export const updateUsers = (id, type) => async dispatch => {
  try {
    let {data} = await axios.put(`/api/users/${id}`, {type})
    dispatch(updatedUsers(data))
  } catch (error) {
    console.error(error)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return {...state, currentUser: action.user, error: {}}
    case REMOVE_USER:
      return {...state, currentUser: []}
    case GOT_USERS:
      return {...state, allUsers: action.users}
    case UPDATED_USERS: {
      let newUsers = state.allUsers.filter(user => {
        return user.id !== action.updatedUser.id
      })
      return {...state, allUsers: newUsers}
    }
    case DISPLAY_ERROR:
      return {...state, error: action.error}
    default:
      return state
  }
}
