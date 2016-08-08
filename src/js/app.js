import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

// store
import store from './store'
// Routes
import routes from './routes'
// style
import '../scss/index.scss'


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} children={routes}>
    </Router>
  </Provider>, document.getElementById('cids'));
