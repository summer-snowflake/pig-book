import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Tag } from 'types/api'

interface Props {
  tag: Tag;
}

class TagName extends Component<Props> {
  render(): JSX.Element {
    const colorCodeStyles = {
      color: this.props.tag.color_code
    }

    return (
      <span className='tag-name-component'>
        <FontAwesomeIcon className='left-icon light-green' icon={['fas', 'bookmark']} style={colorCodeStyles} />
        {this.props.tag.name}
      </span>
    )
  }
}

export default TagName
