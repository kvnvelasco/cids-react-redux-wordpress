import React, { Component } from 'react'
import  Parser  from 'react-html-parser'
import { IndexLink } from 'react-router'

export default class HorizontalMenu extends Component{
  constructor() {
    super()
  }

  parseMenu(menuArray, renderLeft) {
    let style = {}
    style.li = { minWidth: `${100/menuArray.length}%` }
    style.a = { whiteSpace: 'normal'}
    style.ul = renderLeft ? {left: 'initial', right: '100%'} : {}

    let navigation = menuArray.map( (menuItem, index, menuArray) => {
      let link = menuItem.url
      let anchor = <a href={link} style={style.a} dangerouslySetInnerHTML={{__html: menuItem.title}} />
      let active = 'active'
      // Remove the domain from the links
      if(this.props.strip) {
        link = menuItem.url.split('/')
        .filter( item => item == '' ? false : true)
        .reduce( (acc, curr, index) => {
          return index > 1 ? acc.concat('/' , curr) : acc
        },'') || '#'
        anchor = <IndexLink activeClassName='active'  to={link} style={style.a} dangerouslySetInnerHTML={{__html: menuItem.title}} />
      }

      let final = <li key={menuItem.id} style={style.li}>
                    {anchor}
                  </li>

      // Parse the Children if they exist
      if (menuItem.children) {
        let children = this.parseMenu(menuItem.children, index > menuArray.length/2)
        final = <li key={menuItem.id} class='not-click has-dropdown' style={style.li}>
                  {anchor}
                  <ul class='dropdown' style={{...style.ul, minWidth: '15vw', maxWidth: '30vw'}}>
                    {children}
                  </ul>
              </li>
        }
        return final
    })

    return navigation
  }

  render() {
    let navigation = this.parseMenu(this.props.menu.items)
    return   <ul key={this.props.menu.id}>
                {navigation}
              </ul>

  }
}
