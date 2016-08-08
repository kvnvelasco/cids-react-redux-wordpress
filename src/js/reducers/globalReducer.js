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

    case 'READY':
      return {...state, loaded: true, bootstrapped: true}
    default:
      return state
  }
}
