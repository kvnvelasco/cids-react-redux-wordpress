const defaultState = {
  open: false,
  pending: 0,
  fetchedAll: false,
  all: [],
  primary: {
    items: []
  },
  current: []
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case '_MENU':
      return {...state, open: action.payload}

    case 'GETTING_MENU':
      state.pending++
      return {...state}

    case 'GOT_MENU':
      state.pending--
      let completed = state.pending == 0 ? true : false
      state[action.payload.slug] = action.payload
      return {...state, fetchedAll: completed}

    case 'SET_CURRENT_MENU_PRIMARY':
      state.current.push(action.payload)
      return {...state}

    case 'BACK_MENU':
      state.current.pop()
      return {...state}

    case 'CLEAR_MENU_STACK':
      state.current = []
      state.current.push(state.primary.items)
      return {...state}

    default:

      return state
  }
}
