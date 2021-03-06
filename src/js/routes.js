import Base from './screens/base'
import Home from './components/smart/home'
import Post from './components/smart/post'
import Page from './components/smart/page'
import Search from './components/smart/Search'

const componentFetcher = (cb) =>{
  return (module) => cb(null, module.default)
}

const routes = [
  {
    path: 'search(/:query)',
    component: Search
  },
  {
    path: 'articles/(:slug)(/:index)',
    component: Post
  },
  {
    path: '(**/):pageId',
    component: Page
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
  indexRoute: {
    component: Home
  },
  childRoutes: routes
  },

]
