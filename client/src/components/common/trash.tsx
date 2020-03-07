import React, { Component } from 'react'

class Trash extends Component {
  render(): JSX.Element {
    return (
      <div className='trash-component icon-field float-right'>
        <i className='fas fa-trash' />
      </div>
    )
  }
}

export default Trash

