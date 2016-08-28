import React, { Component } from 'react'
import {Link} from 'react-router'
import { connect } from 'react-redux'
import HorizontalMenu from '../dumb/horizontalMenu'

import { openMenu } from '../../actions/menuActions'
import Search from '../dumb/Search.js'


@connect(store => {
  return {
    menus: store.menus
  }
})
export default class Header extends Component{
  constructor() {
    super()
  }

  openBurger() {
    this.props.dispatch(openMenu())
  }

  render() {
    const topMenu = this.props.menus.top
    // const mainMenu = this.props.menus.data.filter( item => item.slug == 'primary' ? true : false)[0]
    return <div>
        <nav class='top-bar up-nav'>

          <div class="top-bar-section ">
            <HorizontalMenu menu={topMenu} position='right'/>
            <ul class='left'>
              <div class='title-area'>
              </div>
            </ul>
          </div>
        </nav>

      <header class="banner">
        <div id="main-banner">
          <div class="up-logo-large">
          </div>
            <h3> Center for Integrative and Development Studies </h3>
            <p> The University of the Philippines-Center for Integrative and Development Studies (UP-CIDS) spans various perspectives,
            methodologies, and ideologies in its conduct of basic and policy-oriented research. The Center harnesses
            the University’s multidisciplinary expertise in its studies on critical fields. </p>
        </div>
      </header>
      <nav class='nav-primary row'>
        <div class="large-10 small-12 columns small-centered">
          <div class='row' >
            <div onClick={this.openBurger.bind(this)} class='columns small-6 medium-3 large-3'>
              <div class='menu-button'> Menu </div>
            </div>
            <Search class='columns small-6 medium-3 large-4' dispatch={this.props.dispatch}/>
          </div>
        </div>
      </nav>

    </div>
  }
}
