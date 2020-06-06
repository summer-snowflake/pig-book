import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'

import { Tag } from 'types/api'

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
        <span
          data-tip={this.props.tag.name}
          onClick={this.handleClickTag}
          style={{color: this.props.tag.color_code}}
        >
          <i className='fas fa-bookmark' />
          <ReactTooltip />
        </span>
      </span>
    )
  }
}

export default TagIcon
