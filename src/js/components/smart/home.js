import React, { Component } from 'react'
import { connect } from 'react-redux'
import  Parser  from 'react-html-parser'
import {Link} from 'react-router'

import { fetchPosts, fetchAnnouncements } from '../../actions/postsActions'


@connect(store => {
  return {
    posts: store.posts,
    postAPI: store.globals.posts.url,
    loaded: store.globals.loaded,
    announcements: store.posts.announcements
  }
})
export default class Home extends Component{
  constructor() {
    super()
  }

  componentWillMount() {
    if (!this.props.posts.postsFeteched) {
      // Load the first set of posts
      this.props.dispatch(fetchPosts(this.props.postAPI))
    }
    if (!this.props.posts.announcements.fetched) {
      // Load the first set of posts
      this.props.dispatch(fetchAnnouncements(this.props.postAPI))
    }

  }

  parsePosts(data) {
    let posts = data.all.map( (post, index) => {
      return <li key={post.id}>
        <div class='post-title'>
          <Link to={`/articles/${post.slug}/${index}`} >
            <h3 dangerouslySetInnerHTML={{__html: post.title}} />
          </Link>
        <span class='date'> {post.date} </span>
        </div>
        <div class='post-preview'>
          <div  dangerouslySetInnerHTML={{__html: post.preview}}  />
        </div>
      </li>
    })
    return posts
  }

  render() {
    console.log(this.props.announcements)
    let posts = this.props.posts.postsFetched ? this.parsePosts(this.props.posts): false
    let announcements = this.props.announcements.fetched ? this.parsePosts(this.props.announcements) : false

    if (!this.props.posts.postsFetched) {return <div class='uil-ring-css'><div></div></div>}
    return <div class='row' >
      {/* Posts */}
      <section class='small-12 medium-8 columns' style={{paddingTop: '50px'}}>
      <ul class='medium-block-grid-1 large-block-grid-2 home-posts'>
        {posts}
      </ul>
      </section>

      {/* Sidebar */}
      <section class="small-12 medium-4 columns">
        <div class="sidebar_wrapper" style={{paddingTop: '50px'}}>
          <sidebar>
            <h4> Announcements </h4>
            <ul class='small-block-grid-3 medium-block-grid-1'>
              {announcements}
            </ul>
          </sidebar>
        </div>
      </section>

    </div>
  }

}
