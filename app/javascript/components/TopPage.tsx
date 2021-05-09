import React, { Component } from 'react'

import TwitterTimeline from 'components/top/TwitterTimeline'
import TopCarousel from 'components/top/TopCarousel'

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
