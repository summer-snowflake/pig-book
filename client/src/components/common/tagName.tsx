import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Tag } from 'types/api'

interface Props {
  tag: Tag;
  onClickCancel: (tag: Tag) => void
}

class TagName extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleClickCancelTag = this.handleClickCancelTag.bind(this)
  }

  handleClickCancelTag(): void {
    this.props.onClickCancel(this.props.tag)
  }

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
