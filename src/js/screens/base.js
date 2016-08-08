import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAPI } from '../actions/API'
import Radium from 'radium'
import { Link } from 'react-router'

import Header from '../components/smart/header'
import Announcements from '../components/announcements'

let Menu = require('react-burger-menu').push

let RadLink = Radium(Link)


@connect( store => {
  return {
    loaded: store.globals.loaded,
    bootstrapped: store.globals.bootstrapped,
    menus: store.menus
  }
})
export default class Base extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
    this.props.dispatch(getAPI())
  }

  componentDidUpdate() {
    if(this.props.menus.fetchedAll && !this.props.bootstrapped) {
      this.props.dispatch({type: 'SET_CURRENT_MENU_PRIMARY', payload: this.props.menus.primary.items})
      this.props.dispatch({type: 'READY'})
    }
  }

  parseMenu(menu) {
    if(!menu.length){ return null }

    return menu.map( (item, index) => {
      let link = item.url.split('/')
      .filter( item => item == '' ? false : true)
      .reduce( (acc, curr, index) => {
        return index > 1 ? acc.concat('/' , curr) : acc
      },'') || '#'
      let handler = item.children ? this.subMenu.bind(this, index, item.id) : this.closeMenu.bind(this)
      let classes = item.children ? 'has-children' : 'no-children'
      return <li key={item.id} class={`nav-item ${classes}`}><RadLink onClick={handler} to={link} dangerouslySetInnerHTML={{__html: item.title}}/></li>
    })
  }

  subMenu(index, itemId, event) {
    event.preventDefault()
    this.props.dispatch({type: 'SET_CURRENT_MENU_PRIMARY', payload: this.props.menus.current[this.props.menus.current.length-1][index]['children']})
  }

  closeMenu(event) {
    this.props.dispatch({type: '_MENU', payload: false})
    this.props.dispatch({type: 'CLEAR_MENU_STACK'})

  }

  backMenu() {
    this.props.dispatch({type: 'BACK_MENU'})
  }

  render() {
    let primary = this.props.menus.current[this.props.menus.current.length-1] ? this.parseMenu(this.props.menus.current[this.props.menus.current.length-1]) : null
    let back = this.props.menus.current.length > 1 ? <h4 onClick={this.backMenu.bind(this)}> {'< Back'} </h4> : <div />
    switch (this.props.loaded) {
      case true:
        return  <div style={{paddingBottom: '50px'}} id="outer-container">
                    <Menu pageWrapId={ "cids-page" } left  outerContainerId={ "outer-container" }
                    isOpen={this.props.menus.open} customBurgerIcon={false} customCrossIcon={ false }>
                      {back}
                      <ul>
                        {primary}
                      </ul>

                    </Menu>
                    <div id='cids-page'>
                      <Header menus={this.props.menus}/>
                      <div style={{paddingLeft: '30px', paddingRight: '30px'}}>
                        {this.props.children}
                      </div>
                    </div>
                    {/* Insert Footer Here */}
                  </div>

      default:
        return  <div class='uil-ring-css'>
                  <div></div>
                </div>
    }
  }
}
