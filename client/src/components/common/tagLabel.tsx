import React, { Component } from 'react'

import { Tag } from 'types/api'
import TagName from 'components/common/tagName'

interface Props {
  tag: Tag;
  onClickCancel: (tag: Tag) => void
}

class TagLabel extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleClickCancelTag = this.handleClickCancelTag.bind(this)
  }

  handleClickCancelTag(): void {
    this.props.onClickCancel(this.props.tag)
  }

  render(): JSX.Element {
    return (
      <span className='tag-label-component'>
        <TagName tag={this.props.tag} />
        <span className='cancel-icon' onClick={this.handleClickCancelTag}>
          <i className='fas fa-times right-icon' />
        </span>
      </span>
    )
  }
}

export default TagLabel
