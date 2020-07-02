import React, { Component } from 'react'

interface Props {
  colorCode: string;
  onClick: () => void;
}

class ColorBox extends Component<Props> {
  render(): JSX.Element {
    const style = {
      backgroundColor: this.props.colorCode
    }
    return (
      <span className='color-box-component form-control'>
        <div className='color-code-box' style={style} />
        <div className='color-code-text'>
          {this.props.colorCode}
        </div>
      </span>
    )
  }
}

export default ColorBox
