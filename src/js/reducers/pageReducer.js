export default function reducer(state={fetching: true, fetched: false}, action) {
  switch (action.type) {
    case 'FETCHING_PAGE':
      return {...state, fetching: true}
    case 'FETCHED_PAGE':
      return {...state, data: action.payload, fetched: true, fetching: false}
    default:
      return state
  }
}
