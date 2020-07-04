import React, { Component} from 'react'
import TwitterTimeline from 'components/top/twitterTimeline'

class TopPage extends Component {
  render(): JSX.Element {
    return (
      <div className='top-page-component container-fluid'>
        <TwitterTimeline />
      </div>
    )
  }
}

export default TopPage
