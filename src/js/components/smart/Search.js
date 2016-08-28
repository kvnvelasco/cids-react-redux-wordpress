import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from '../dumb/post'

import {startSearch} from '../../actions/searchActions'

@connect( store => {
  return {
    search: store.search
  }
})
export default class Search extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
    if (this.props.params.query) {
      this.props.dispatch(startSearch(this.props.params.query))
    }
  }


  render() {
    let posts = this.props.search.results ? this.props.search.results.map( item => {
      return <Post key={item.id} post={item} />
    }) : null

    let spinner = <div class='uil-ring-css'> <div></div> </div>
    return <div class='search-results row'>
              <h3 style={noResults}>
                { this.props.search.results && !this.props.search.results.length ?  'No results' : `Search results`}
              </h3>

              <ul style={{listStyle: 'none'}} class='medium-block-grid-1 large-block-grid-2'>
                {posts || spinner}

              </ul>
          </div>
  }
}

const noResults = {
  fontFamily: 'Alegreya SC',
  marginTop: '40px',
  fontSize: '25px',
  fontWeight: 'lighter'
}
