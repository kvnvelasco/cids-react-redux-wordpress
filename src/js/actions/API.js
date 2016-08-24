import axios from 'axios'

export const getAPI = () => {
  return (dispatch) => {
    axios.get('/wp-json')
    .then(response => {
       let routes = parseRoutes(response.data.routes)
       console.log(response)
       dispatch({type: 'API_DISCOVERED', payload: routes})
       if(routes.menuAPI.enabled) { dispatch(discoverMenus(routes.menuAPI.url)) }
       else { dispatch({type: 'READY'})}
    })
    .catch( response => {
      console.error('Discovery Failed', response)
    })
  }
}

const discoverMenus = (data) => {
  return (dispatch) => {
    dispatch({type: 'DISCOVERING_MENUS'})
    axios.get(data)
    .then(response => {
      response.data.forEach( menu => {
        dispatch(getMenu(menu))
      })
    })
    .catch( response => {
      console.error('Menu Discovery Failed', response)
    })
  }
}

const getMenu = (menu) => {
  return (dispatch) => {
    dispatch({type: 'GETTING_MENU'})
    axios.get(menu.meta.links.self)
    .then(response => {
      dispatch({type: 'GOT_MENU', payload: response.data})
    })
    .catch( response => {
      console.error('Get Menu Failed', response)
    })
  }
}

const parseRoutes = (routesArray) => {
  let parsed = {}
  parsed.menuAPI = {}
  parsed.postAPI = {}

  Object.keys(routesArray).forEach( (route, index) => {
    switch (route) {
      case '/wp-api-menus/v2/menus':
        parsed.menuAPI.url = '/wp-json' + route
        parsed.menuAPI.enabled = true
        parsed.menuAPI.discovered = false
        break
      case '/wp/v2/posts':
        parsed.postAPI.url = '/wp-json' + route
        break
    }
  })

  return parsed
}
