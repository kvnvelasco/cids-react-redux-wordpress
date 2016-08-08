import { combineReducers } from "redux"

import globals from './globalReducer'
import posts from './postsReducer'
import page from './pageReducer'

export default combineReducers({
  globals,
  posts,
  page
})
