import React, { Component } from "react"

import TwitterTimeline from 'components/top/twitterTimeline'
import TopCarousel from 'components/top/topCarousel'

class TopPage extends Component {
  render (): JSX.Element {
    return (
      <div className='top-page-component container'>
        <div className='row'>
          <TopCarousel />
          <TwitterTimeline />
        </div>
      </div>
    );
  }
}

export default TopPage
