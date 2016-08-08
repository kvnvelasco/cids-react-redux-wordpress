export default function reducer(state = {postsFetched: false, fetching: true, all: [], post: {}, announcements: [], canNext: false, canPrev: false}, action) {
  let announcements = state.announcements
  switch (action.type) {
    case 'FETCHING_POSTS':
      return {...state, fetching: true, all: []}
    case 'FETCHED_POSTS':
      return {...state, fetching: false, postsFetched: true, all: action.payload.data, page: action.payload.page}

    case 'GOT_FEATURED_MEDIA':
    // Search through data state to find the correct one:
      let newPosts = state.all.map( post => {
        return post.id == action.payload.id ? {...post, media: action.payload.media}: post
      })
      return {...state, data: newPosts}

    case 'FETCHING_POST':
      return {...state, fetching: true}

    case 'FETCHED_POST':
      return {...state, fetching: false, post: action.payload}

    case 'CAN_NEXT':
      return {...state, canNext: action.payload}

    case 'CAN_PREV':
      return {...state, canPrev: action.payload}

    case 'FETCHED_NEXT':
      return {...state, next: action.payload}

    case 'FETCHING_ANNOUNCE':
      return {...state, announcements: {...announcements, fetched: false, fetching: true}}

    case 'FETCHED_ANNOUNCE':
      return {...state, announcements: {...announcements, fetched: true, fetching: false, all: action.payload}}
    default:
      return state
  }
}
