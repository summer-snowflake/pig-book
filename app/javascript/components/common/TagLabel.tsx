import React, { Component } from 'react'

import { Tag } from 'types/api'
import TagName from 'components/common/TagName'

interface Props {
  tag: Tag;
  onClickCancel: (tag: Tag) => void;
  onClickButton: (tag: Tag) => void;
}

class TagLabel extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleClickCancelTag = this.handleClickCancelTag.bind(this)
    this.handleClickButton = this.handleClickButton.bind(this)
  }

  handleClickCancelTag(): void {
    this.props.onClickCancel(this.props.tag)
  }

  handleClickButton(): void {
    this.props.onClickButton(this.props.tag)
  }

  render(): JSX.Element {
    return (
      <span className='tag-label-component' onClick={this.handleClickButton}>
        <TagName tag={this.props.tag} />
        <span className='cancel-icon' onClick={this.handleClickCancelTag}>
          <i className='fas fa-times' />
        </span>
      </span>
    )
  }
}

export default TagLabel
