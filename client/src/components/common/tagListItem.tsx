import React, { Component } from 'react'

import { Tag } from 'types/api'
import TagName from 'components/common/tagName'

interface Props {
  tag: Tag;
  onClickTagName: (tag: Tag) => void
}

class TagListItem extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleClickTagName = this.handleClickTagName.bind(this)
  }

  handleClickTagName(): void {
    this.props.onClickTagName(this.props.tag)
  }

  render(): JSX.Element {
    return (
      <li className='tag-list-item-component list-item' onClick={this.handleClickTagName}>
        <TagName tag={this.props.tag} />
      </li>
    )
  }
}

export default TagListItem
