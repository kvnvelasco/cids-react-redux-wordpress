import React, { Component } from 'react'
import { connect } from 'react-redux'
import Parser  from 'react-html-parser'
import { getAPI } from '../actions/API'

import Header from '../components/smart/header'
import Announcements from '../components/announcements'

@connect( store => {
  return {
    loaded: store.globals.loaded,
    menus: store.globals.menus
  }
})
export default class Base extends Component {
  constructor() {
    super()
  }

  componentWillMount(){
    this.props.dispatch(getAPI())
  }

  render() {
    switch (this.props.loaded) {
      case true:
        return  <div style={{paddingBottom: '50px'}}>
                  <Header menus={this.props.menus} />
                  <div style={{paddingLeft: '30px', paddingRight: '30px'}}>
                    {this.props.children}
                  </div>

                  {/* Insert Footer Here */}
                </div>
        break
      default:
        return  <div class='uil-ring-css'>
                  <div></div>
                </div>
    }
  }
}
