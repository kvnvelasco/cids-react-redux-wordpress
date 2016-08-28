import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { startSearch } from '../../actions/searchActions'

export default class Search extends Component {
  constructor() {
    super()
    this.search = this.search.bind(this)
  }

  search(event) {
    event.preventDefault()
    this.props.dispatch(startSearch(event.target[0].value))
    browserHistory.push(`/search/${event.target[0].value}`)
  }
  render() {
    return <div class={this.props.className + " search-bar"}>
            <form onSubmit={this.search} class='row collapsed'>
              <div class='columns small-10 collapsed' >
                <input type="text" placeholder="Search UP CIDS" style={style.searchField}/>
              </div>
              <button class="search-button small-2 collapsed" style={style.searchButton}> </button>
            </form>
          </div>
  }
}

const style = {
  searchField: {
    border: '0',
    borderRadius: '50px',
    fontSize: '14px',
    height: '20px',
    padding: '20px 30px',
    marginTop: '7px',
    marginBottom: '0px'
  },

  searchButton: {
    margin: '0'
  }
}
