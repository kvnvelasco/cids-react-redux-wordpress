import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchPost } from '../../actions/postsActions'

@connect(store => {
  return {
    posts: store.posts.all,
    fetched: store.posts.postsFetched,
    fetching: store.posts.fetching,
    post: store.posts.post,
    postAPI: store.globals.posts.url,
  }
})
export default class Post extends Component{
  constructor() {
    super()
  }

  componentWillMount() {
    this.props.dispatch(fetchPost(this.props.postAPI, this.props.routeParams.slug))
  }

  componentDidUpdate(){
    if(this.props.post.slug != this.props.routeParams.slug) {
      this.props.dispatch(fetchPost(this.props.postAPI, this.props.routeParams.slug))
    }
  }

  render() {
    switch (this.props.fetching) {
      case true:
        return <div class='uil-ring-css'><div></div></div>
        break
      case false:
        return <div style={{maxWidth: '960px', margin: 'auto'}} >
          <h2 dangerouslySetInnerHTML={{__html: this.props.post.title}} />
          <div dangerouslySetInnerHTML={{__html: this.props.post.content}}></div>
        </div>

    }
  }

}
