import React, { Component } from 'react'

import Image from 'images/pig-loading.gif'

class LoadingImage extends Component {
  render(): JSX.Element {
    return (
      <tr className='loading-image-component'>
        <td colSpan={8}>
          <img className='loading' src={Image} />
        </td>
      </tr>
    )
  }
}

export default LoadingImage
