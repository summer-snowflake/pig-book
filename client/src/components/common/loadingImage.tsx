import React, { Component } from 'react'

import loadingImage from 'images/pig-loading.gif'

class LoadingImage extends Component {
  render(): JSX.Element {
    return (
      <span className='loading-image-component'>
        <img alt='loading' className='loading-image' src={loadingImage} />
      </span>
    )
  }
}

export default LoadingImage
