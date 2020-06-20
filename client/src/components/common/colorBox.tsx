import React, { Component } from 'react'

interface Props {
  colorCode: string;
}

class ColorBox extends Component<Props> {
  render(): JSX.Element {
    return (
      <span className='color-box-component'>
        {this.props.colorCode}
      </span>
    )
  }
}

export default ColorBox
