import React, { Component } from 'react'
import Radium from 'radium'
import { Link } from 'react-router'
let RadLink = Radium(Link)


export default class Post extends Component {
  constructor() {
    super()
  }

  render() {
    return  <li>
              <div class='post-title'>
                <RadLink to={`/${this.props.post.slug}`} >
                  <h3 dangerouslySetInnerHTML={{__html: this.props.post.title.rendered}} />
                </RadLink>
              <span class='date'> {this.props.post.date} </span>
              </div>
              <div class='post-preview'>
                <div  dangerouslySetInnerHTML={{__html: this.props.post.excerpt.rendered.replace('[&hellip;]', '...')}}  />
                <RadLink to={`/articles/${this.props.post.slug}`}>
                  <span> Read more </span>
                </RadLink>
              </div>
            </li>
  }
}
