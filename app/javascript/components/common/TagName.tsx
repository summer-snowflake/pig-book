import React, { Component } from 'react'

import { Tag } from 'types/api'

interface Props {
  tag: Tag;
}

class TagName extends Component<Props> {
  render(): JSX.Element {
    const colorCodeStyles = {
      backgroundColor: this.props.tag.color_code
    }

    return (
      <span className='tag-name-component'>
        <span className='color-code-back-box'>
          <span className='color-code-box' style={colorCodeStyles}>
          </span>
        </span>
        {this.props.tag.name}
      </span>
    )
  }
}

export default TagName
