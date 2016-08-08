import React, { Component } from 'react'
import {Link} from 'react-router'

import HorizontalMenu from '../dumb/horizontalMenu'

export default class Header extends Component{
  constructor() {
    super()
  }
  render() {
    const topMenu = this.props.menus.data.filter( item => item.slug == 'top' ? true : false)[0]
    const mainMenu = this.props.menus.data.filter( item => item.slug == 'primary' ? true : false)[0]
    return <div>
        <nav class='top-bar'>
          <div class='title-area'>
            <Link to='/' >
              <div class="up-logo-top " />
            </Link>

          </div>
          <div class="top-bar-section">
            <HorizontalMenu menu={topMenu} />
          </div>
        </nav>

      <header class="banner">
        <div id="main-banner">
          <div class="up-logo-large">
          </div>
          <Link to='/' >
            <h3> Center for Integrative Development Studies </h3>
          </Link>
        </div>
      </header>
      <nav class='top-bar nav-primary' style={{height: 'auto'}}>
        <ul class='title-area'>
          <li class='toggle-topbar menu-icon'>
            <a> Menu</a>
          </li>
        </ul>
        <div class='container'>
          <section class="top-bar-section" >
            <div>
              <HorizontalMenu menu={mainMenu} strip={true}/>
            </div>
          </section>
        </div>
      </nav>
    </div>
  }
}
