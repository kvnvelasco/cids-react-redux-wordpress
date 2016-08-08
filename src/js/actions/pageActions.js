import axios from 'axios'

export const getPage = (slug) => {
  return dispatch => {
    dispatch({type: 'FETCHING_PAGE'})
    axios.get(`/wp-json/wp/v2/pages?slug=${slug}`)
    .then(response => {
      if (!response.data.length) {
        console.error('CANNOT_FIND_PAGE', slug)
        dispatch(attemptPost(slug))
      } else {
        dispatch({type: 'FETCHED_PAGE', payload: response.data[0]})
      }
    })
    .catch(err => {
      console.error('PAGE FETCHING FAILED', err)
    })
  }
}

const attemptPost = (slug) => {
  return dispatch => {
    dispatch({type: 'ATTEMPTING_POST'})
    axios.get(`/wp-json/wp/v2/posts?slug=${slug}`)
    .then( response => {
      if (!response.data.length) {
        console.error('CANNOT_FIND_POST', slug)
        dispatch({type: '404'})
      } else {
        dispatch({type: 'FETCHED_PAGE', payload: response.data[0]})
      }
    })
    .catch(err => {
      console.error('POST_FETCHING_FAILED', err)
    })
  }
}
