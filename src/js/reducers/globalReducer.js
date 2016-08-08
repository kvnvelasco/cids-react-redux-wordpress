export default function reducer(state = {loaded: false, menus: {}}, action) {
  let menus = state.menus || {}
  let pending = state.menus.pending || 0

  switch (action.type) {
    case 'PAGE_LOADED':
      return {...state, loaded: true}
      break
    case 'API_DISCOVERED':
      return {
        ...state,
        title: action.payload.name,
        description: action.payload.description,
        menus: action.payload.menuAPI,
        posts: action.payload.postAPI
      }

    case 'GETTING_MENU':
      pending++
      return {...state,
        menus: {...menus, pending: pending}}

    case 'GOT_MENU':
      let data = state.menus.data || []
      let loaded = state.loaded || false
      pending--
      if(pending == 0) {loaded = true}
      data.push(action.payload)

      return {...state,
        menus: {...menus, data: data, pending: pending},
        loaded: loaded
      }

    case 'READY':
      return {...state, loaded: true}
    default:
      return state
  }
}
