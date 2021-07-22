import React, { Component } from 'react'

import { Tag } from 'types/api'

interface ParentProps {
  tag: Tag;
}

type Props = ParentProps

class TagName extends Component<Props> {
  render(): JSX.Element {
    const colorCodeStyles = {
      backgroundColor: this.props.tag.color_code
    }

    return (
      <span className='tag-name-component'>
        <span className='color-code-box' style={colorCodeStyles}>
        </span>
        <span className='tag-name'>
          {this.props.tag.name}
        </span>
      </span>
    )
  }
}

export default TagName
