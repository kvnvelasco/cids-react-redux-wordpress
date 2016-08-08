import axios from 'axios'
import moment from 'moment'

export const fetchPosts = (postAPI, page) => {
  return dispatch => {
    dispatch({type: 'FETCHING_POSTS'}, page)
    if(page == 1) { dispatch({type: 'CAN_PREV', payload: false}) }
    else { dispatch({type: 'CAN_PREV', payload: true}) }

    axios.get(postAPI, {
      params: {
        page: page || 1
      }
    })
    .then( response => {
      dispatch({type: 'FETCHED_POSTS', payload: {data: parsePost(response.data, dispatch), page: page} })
      dispatch(getNextPage(postAPI, page))
    })
    .catch( err => {
      console.error('FAILED TO FETCH POSTS', err)
    })
  }
}

const getNextPage = (postAPI, page) => {
  return dispatch => {
    dispatch({type: 'FETCHING_NEXT', payload: page})
    axios.get(postAPI, {
      params: {
        page: page + 1
      }
    })
    .then( response => {
      console.log(response)
      if(response.data.length == 0){dispatch({type: 'CAN_NEXT', payload: false})}
      else {
        dispatch({type: 'FETCHED_NEXT', payload: parsePost(response.data)})
        dispatch({type: 'CAN_NEXT', payload: true})
      }
    })
  }
}



export const fetchPost = (api, slug) => {
  return dispatch => {
    dispatch({type: 'FETCHING_POST'})
    axios.get(`${api}?slug=${slug}`)
    .then(response => {
      if (response.data.length > 0) {
        dispatch({type: 'FETCHED_POST', payload: parsePost(response.data, dispatch)[0]})
      } else {
        dispatch({type: 'FETCHED_POST', payload: null})
      }
    })
    .catch( err => {
      console.error('FAILED TO FETCH POST', err)
    })
  }
}

export const fetchAnnouncements = (api) => {
  return dispatch => {
    dispatch({type: 'FETCHING_ANNOUNCE'})
    axios.get('/wp-json/wp/v2/categories?slug=announcements')
    .then( response => {
      if(response.data.length > 0) {
        let url = response.data[0]['_links']['wp:post_type'][0].href
        dispatch(fetchAnnouncePosts(url))
      }
    })
    .catch( err => {
      console.error('FAILED TO FETCH ANNOUNCE', err)
    })
  }
}

const fetchAnnouncePosts = (api) => {
  return dispatch => {
    axios.get(`${api}&per_page=4`)
    .then( response => {
      dispatch({type: 'FETCHED_ANNOUNCE', payload: parsePost(response.data, dispatch) })
    })
    .catch( err => {
      console.error('FAILED TO FETCH ANNOUNCE DOWNSTREAM', err)
    })
  }
}

const getMedia = (id, mediaID) => {
  return (dispatch) => {
    axios.get(`/wp-json/wp/v2/media/${mediaID}`)
    .then( response => {
      dispatch({type: 'GOT_FEATURED_MEDIA', payload: {id: id, media: response.data.media_details.sizes}})
    })
    .catch( err => {
      console.error('FAILED TO FETCH MEDIA', err)
    })
  }
}


export const parsePost = (data) => {
  let posts = data.map( post => {
    return {
      id: post.id,
      slug: post.slug,
      date: moment(new Date(post.date)).format('Do MMM YYYY'),
      title: post.title.rendered,
      link: post.link,
      meta: post._links,
      content: post.content.rendered,
      preview: post.excerpt.rendered
    }
  })
  return posts
}
