export default function searchReducer( state = {}, action){
  switch (action.type) {
    case 'SEARCHING':
      return {...state, results: undefined}
    case 'SEARCH_COMPLETE':
      let mergedResults = action.payload.reduce( (result, curr) => {
        result = [...result, ...curr]
        return result
      }, [])
      return {...state, results: mergedResults}
    default:
      return state
  }

}
