import axios from 'axios'
import moment from 'moment'

export const fetchPosts = (postAPI) => {
  return dispatch => {
    dispatch({type: 'FETCHING_POSTS'})
    axios.get(postAPI)
    .then( response => {

      dispatch({type: 'FETCHED_POSTS', payload: parsePost(response.data, dispatch) })
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
  }
}

const fetchAnnouncePosts = (api) => {
  return dispatch => {
    axios.get(`${api}&per_page=4`)
    .then( response => {
      dispatch({type: 'FETCHED_ANNOUNCE', payload: parsePost(response.data, dispatch) })
    })
  }
}

const getMedia = (id, mediaID) => {
  return (dispatch) => {
    axios.get(`/wp-json/wp/v2/media/${mediaID}`)
    .then( response => {
      dispatch({type: 'GOT_FEATURED_MEDIA', payload: {id: id, media: response.data.media_details.sizes}})
    })
  }
}


const parsePost = (data, dispatch) => {
  let posts = data.map( post => {
    // check if featured media
    if (post.featured_media != 0) {
      dispatch(getMedia(post.id, post.featured_media))
    }

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
