import React, { Component} from 'react'

import TwitterTimeline from 'components/top/twitterTimeline'
import TopCarousel from 'components/top/topCarousel'
import TopMenuWithIcons from 'components/top/topMenuWithIcons'

class TopPage extends Component {
  render(): JSX.Element {
    return (
      <div className='top-page-component container'>
        <div className='row'>
          <div className='col-1 d-lg-none'>
            <TopMenuWithIcons />
          </div>
          <div className='col'>
            <TopCarousel />
            <TwitterTimeline />
          </div>
        </div>
      </div>
    )
  }
}

export default TopPage
