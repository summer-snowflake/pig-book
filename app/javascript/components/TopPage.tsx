import React, { Component} from 'react'

import TwitterTimeline from 'components/top/twitterTimeline'
import TopCarousel from 'components/top/topCarousel'

class TopPage extends Component {
  render(): JSX.Element {
    return (
      <div className='top-page-component center-container'>
        <TopCarousel />
        <TwitterTimeline />
      </div>
    )
  }
}

export default TopPage
