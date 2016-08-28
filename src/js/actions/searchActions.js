import axios from 'axios'

export const startSearch = (queryString) => {
  return dispatch => {
    dispatch({type: 'SEARCHING'})
    let searchParams = {
      params: {
        search: encodeURIComponent(queryString),
        per_page: 100
      }
    }
    let postSearch = axios.get(`/wp-json/wp/v2/posts`, searchParams)
    let pageSearch = axios.get(`/wp-json/wp/v2/pages`, searchParams)

    Promise.all([postSearch, pageSearch])
    .then( response => {
      let payload = response.map( item => {
        return item.data
      })
      dispatch({type: 'SEARCH_COMPLETE', payload: payload})
    })
    .catch( error => {
      console.error('search failure', error)
    })
  }
}
