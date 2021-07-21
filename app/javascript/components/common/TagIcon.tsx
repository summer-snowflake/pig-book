import React, { Component } from 'react'

import { Tag } from 'types/api'
import Tooltip from 'components/common/Tooltip'

interface Props {
  tag: Tag;
  onClickTag: (tag: Tag) => void;
}

class TagIcon extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleClickTag = this.handleClickTag.bind(this)
  }

  handleClickTag(): void {
    this.props.onClickTag(this.props.tag)
  }

  render(): JSX.Element {
    return (
      <span className='tag-icon-component'>
        <Tooltip value={this.props.tag.name}>
          <span onClick={this.handleClickTag} style={{color: this.props.tag.color_code}}>
            <i className='fas fa-bookmark' />
          </span>
        </Tooltip>
      </span>
    )
  }
}

export default TagIcon
