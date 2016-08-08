import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import {Router, Route, IndexRoute, browserHistory, applyRouterMiddleware} from 'react-router'
import { useScroll } from 'react-router-scroll'
// store
import store from './store'
// Routes
import routes from './routes'
// style
import '../scss/index.scss'

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} children={routes}
    render={applyRouterMiddleware(useScroll( (prevRouterProps, { routes }) => [0,0] ))}
    >
    </Router>
  </Provider>, document.getElementById('cids'));
