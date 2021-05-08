import React, { Component } from 'react'

import TwitterTimeline from './top/TwitterTimeline'
import TopCarousel from './top/TopCarousel'

import 'stylesheets/top.sass'

class TopPage extends Component {
  render (): JSX.Element {
    return (
      <div className='top-page-component center-container'>
        <TopCarousel />
        <TwitterTimeline />
      </div>
    );
  }
}

export default TopPage
