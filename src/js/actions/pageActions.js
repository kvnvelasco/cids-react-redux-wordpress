import axios from 'axios'

export const getPage = (slug) => {
  return dispatch => {
    dispatch({type: 'FETCHING_PAGE'})
    axios.get(`/wp-json/wp/v2/pages?slug=${slug}`)
    .then(response => {
      if (!response.data.length) {
        dispatch({type: 'CANNOT_FIND_PAGE'})
      } else {
        dispatch({type: 'FETCHED_PAGE', payload: response.data[0]})
      }      
    })
  }
}
