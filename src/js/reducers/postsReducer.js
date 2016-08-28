const defaultState = {
  postsFetched: false,
  fetching: true,
  all: [],
  post: {},
  featured: {
    index: 0,
    items: []
  },
  announcements: [],
  canNext: false,
  canPrev: false
}

export default function reducer(state = defaultState, action) {
  let announcements = state.announcements
  let featured = state.featured
  switch (action.type) {
    case 'FETCHING_POSTS':
      return {...state, fetching: true, all: []}

    case 'FETCHED_POSTS':
      return {...state, fetching: false, postsFetched: true, all: action.payload.data, page: action.payload.page}

    case 'FETCHED_FEATURED':
      return {...state, featured: {...featured, items: action.payload}}


    case 'GOT_FEATURED_MEDIA':
    // Search through data state to find the correct one:
      let postsWithMedia = state.featured.items.map( post => {
        return post.id == action.payload.id ? {...post, media: action.payload.media} : post
      })
      return {...state, featured: {...featured, items: postsWithMedia}}

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

    case 'MOVE_FEATURED':
      let index = (action.payload.type == 'next') ? featured.index + 1 : featured.index - 1
      // console.warn(index)
      return {...state, featured: {...featured, index: index}}

    case 'FETCHING_ANNOUNCE':
      return {...state, announcements: {...announcements, fetched: false, fetching: true}}

    case 'FETCHED_ANNOUNCE':
      return {...state, announcements: {...announcements, fetched: true, fetching: false, all: action.payload}}
    default:
      return state
  }
}
