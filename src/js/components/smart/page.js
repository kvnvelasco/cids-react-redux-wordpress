import React, { Component } from 'react'
import { getPage } from '../../actions/pageActions'

import { connect } from 'react-redux'

@connect( store => {
  return {
    page: store.page.data,
    fetching: store.page.fetching,
  }
})
export default class Page extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
    this.props.dispatch(getPage(this.props.routeParams.pageId))
  }

  componentDidUpdate() {
    if(this.props.page.slug != this.props.routeParams.pageId) {
      this.props.dispatch(getPage(this.props.routeParams.pageId))
    }
  }

  render() {
    switch (this.props.fetching) {
      case true:
        return <div class='uil-ring-css' style={{top: '50px'}}><div></div></div>
      case false:
        return <div style={{maxWidth: '960px', margin: 'auto'}} >
          <h1 dangerouslySetInnerHTML={{__html: this.props.page.title.rendered}}/>
          <div dangerouslySetInnerHTML={{__html: this.props.page.content.rendered}} />
        </div>
    }
  }
}
