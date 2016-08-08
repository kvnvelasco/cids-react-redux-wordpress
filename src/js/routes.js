import Base from './screens/base'
import Home from './components/smart/home'

const componentFetcher = (cb) =>{
  return (module) => cb(null, module.default)
}

const routes = [
  {
    path: 'home',
    component: Home
  },
  {
    path: 'articles/(:slug)(/:index)',
    getComponent: (next, cb) => {
      require.ensure([], (require) => {
        cb(null, require('./components/smart/post').default)
      })
    }
  },
  {
    path: 'about',
    getComponent: (next, cb) => {
      require.ensure([], (require) => {
        cb(null, require('./components/about').default)
      })
    }
  },
  {
    path: '(**/):pageId',
    getComponent: (next, cb) => {
      require.ensure([], (require) => {
        cb(null, require('./components/smart/page').default)
      })
    }
  },
]

export default [
  {
    path: '/wp-admin/customize.php',
    component: Base,
    indexRoute: {
      component: Home
    },
    childRoutes: routes
  },
  {
  path: '/',
  component: Base,
  indexRoute: { onEnter: (nextState, replace) => replace('/home') },
  childRoutes: routes
  },

]
