import React, { Component } from 'react'
import { connect } from 'react-redux'
// import  Parser  from 'react-html-parser'
import { Link } from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Radium from 'radium'
let RadLink = Radium(Link)

import { fetchFeatured, moveFeatured } from '../../actions/postsActions'

@connect(store => {
  return {
    featured: store.posts.featured
  }
})
export default class Featured extends Component {
  constructor() {
    super()
    this.style = {}
  }

  componentWillMount() {
    this.props.dispatch(fetchFeatured())
    this.style = {
      wrapper: {}
    }
  }

  next() {
    this.props.dispatch(moveFeatured('next'))
  }

  prev() {
    this.props.dispatch(moveFeatured('prev'))
  }

  createFeaturedItems() {

    if (!this.props.featured.items.length) { return undefined}
    return this.props.featured.items.map ( item => {
      let imageStyle = {
        backgroundImage: item.media ? `url(${item.media.large.source_url})` : undefined,
        backgroundSize: item.media ? 'cover' : '70px auto'
      }
      return    <div class='featured-item' key={item.id} style={this.style.inner}>
                  <div  class='featured-image' style={imageStyle} />
                  <RadLink to={`/${item.slug}`} >
                    <h2   dangerouslySetInnerHTML={{__html: item.title.rendered}} />
                  </RadLink>
                  <div  dangerouslySetInnerHTML={{__html: item.excerpt.rendered.replace('[&hellip;]', '...')}} />
                </div>

    })
  }

  componentWillUpdate(nextProps, nextState) {
    let width = `${nextProps.featured.items.length ?  nextProps.featured.items.length * 100 : 100}%`
    let componentWidth = nextProps.featured.items.length ? 100/nextProps.featured.items.length : 100
    let translateX = nextProps.featured.index * componentWidth
    console.log(nextProps)

    this.style = {...this.style,
        wrapper: {...this.style.wrapper, width: width, transform: `translateX(-${translateX}%)`},
        inner: {width: `${componentWidth}%`}
      }
  }

  render() {
    let item = this.createFeaturedItems()

    return <div>
              <div class='featured-area'>
                <div class='feature-controls' key='controls'>
                  { !(this.props.featured.index) ? null : <div class='left' onClick={this.prev.bind(this)}/> }
                  { this.props.featured.index == this.props.featured.items.length - 1 ? null :  <div class='right' onClick={this.next.bind(this)}/>}
                </div>
                <div class='feature-wrapper' style={this.style.wrapper}>
                  {item}
                </div>
              </div>
          </div>

  }
}
