import React, { Component } from 'react'

import loadingImage from 'images/pig-loading.gif'

class LoadingImage extends Component {
  render(): JSX.Element {
    return (
      <div className='loading-image-component'>
        <img alt='loading' className='loading-image' src={loadingImage} />
      </div>
    )
  }
}

export default LoadingImage
