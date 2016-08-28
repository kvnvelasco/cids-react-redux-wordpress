// @flow

import { combineReducers } from "redux"

import globals from './globalReducer'
import posts from './postsReducer'
import page from './pageReducer'
import menus from './menusReducer'
import search from './searchReducer'

export default combineReducers({
  globals,
  posts,
  page,
  menus,
  search
})
