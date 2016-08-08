import React, { Component } from 'react'
import { connect } from 'react-redux'
import  Parser  from 'react-html-parser'
import {Link} from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

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
    if (!this.props.posts.postsFetched) {
      // Load the first set of posts
      this.props.dispatch(fetchPosts(this.props.postAPI, parseInt(this.props.routeParams.page) || 1))
    }
    if (!this.props.posts.announcements.fetched) {
      // Load the first set of posts
      this.props.dispatch(fetchAnnouncements(this.props.postAPI))
    }
  }

  next() {
    window.scrollTo(0,200)
    this.props.dispatch(fetchPosts(this.props.postAPI, this.props.posts.page + 1))
    this.props.history.push(`/${this.props.location.pathname.split('/')[1]}/${this.props.posts.page + 1}`)
  }

  prev() {
    window.scrollTo(0,200)
    this.props.dispatch(fetchPosts(this.props.postAPI, this.props.posts.page - 1))
    this.props.history.push(`/${this.props.location.pathname.split('/')[1]}/${this.props.posts.page - 1}`)
  }

  parsePosts(data) {
    if(data.length == 0) {return <div />}
    let posts = data.all.map( (post, index) => {
      return <li key={post.id}>
        <div class='post-title'>
          <Link to={`/articles/${post.slug}/${index}`} >
            <h3 dangerouslySetInnerHTML={{__html: post.title}} />
          </Link>
        <span class='date'> {post.date} </span>
        </div>
        <div class='post-preview'>
          <div  dangerouslySetInnerHTML={{__html: post.preview.replace('[&hellip;]', '...')}}  />
          <Link to={`/articles/${post.slug}/${index}`}>
            <span> Read more </span>
          </Link>
        </div>
      </li>
    })
    return posts
  }

  render() {
    console.log(this.props)
    let posts = this.parsePosts(this.props.posts)
    let announcements = !this.props.posts.announcements.fetching ? this.parsePosts(this.props.announcements) : null
    let spinner = <div class='uil-ring-css'><div></div></div>
    let next = this.props.posts.canNext ? <div onClick={this.next.bind(this)}> {'Next >'} </div> : null
    let prev = this.props.posts.canPrev ? <div onClick={this.prev.bind(this)}> {'< Previous'} </div> : null

    let pagination = !this.props.posts.fetching ? <div class='pagination'> {prev} {next} </div> : null

    if (!this.props.posts.postsFetched) { return <div> {spinner} </div> }
    return <div class='row'>
      {/* Posts */}
      <section class='small-12 medium-8 columns home-page' style={{paddingTop: '50px', paddingBottom: '50px'}}>
        <h4> News and Updates </h4>
        <ReactCSSTransitionGroup transitionName="page"
          transitionEnterTimeout={400} transitionLeaveTimeout={400}
          component='ul' class='medium-block-grid-1 large-block-grid-2 home-posts'>
          {posts}
        </ReactCSSTransitionGroup>
      {pagination}

      </section>

      {/* Sidebar */}
      <section class="small-12 medium-4 columns">
        <div class="sidebar_wrapper" style={{paddingTop: '50px'}}>
          <sidebar>
            <h4> Announcements </h4>
            <ReactCSSTransitionGroup transitionName="page"
              transitionEnterTimeout={400} transitionLeaveTimeout={400}
              component='ul' class='small-block-grid-3 medium-block-grid-1'>
              {announcements}
            </ReactCSSTransitionGroup>
          </sidebar>
        </div>
      </section>

  </div>

  }

}
