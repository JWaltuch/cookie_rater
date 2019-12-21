import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const GOT_USERS = 'GOT_USERS'
const UPDATE_USERS = 'UPDATE_USERS'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {currentUser: [], allUsers: []}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const gotUsers = users => ({type: GOT_USERS, users})
const updateUsers = updatedUser => ({type: UPDATE_USERS, updatedUser})
const removeUser = () => ({type: REMOVE_USER})

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

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
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

export const updatedUsers = id => async dispatch => {
  try {
    let {data} = await axios.put(`/api/users${id}`)
    dispatch(updateUsers(data))
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
      return {...state, currentUser: action.user}
    case REMOVE_USER:
      return {...state, currentUser: []}
    case GOT_USERS:
      return {...state, allUsers: action.users}
    case UPDATE_USERS: {
      let updatedUsers = state.allUsers.filter(user => {
        return user.id !== action.updatedUser.id
      })
      return {...state, allUsers: updatedUsers}
    }
    default:
      return state
  }
}
