import React, { Component} from 'react'

class TwitterTimeline extends Component {
  componentDidMount(): void {
    const script = document.createElement('script')
    script.src = 'https://platform.twitter.com/widgets.js'
    script.async = true

    document.getElementsByTagName('script')[0].replaceWith(script)
  }

  render(): JSX.Element {
    return (
      <div className='twitter-timeline-component'>
        <a
          className='twitter-timeline'
          data-width='400'
          href="https://twitter.com/pig_book?ref_src=twsrc%5Etfw">
          Tweets by pig_book
        </a>
        <script />
      </div>
    )
  }
}

export default TwitterTimeline
