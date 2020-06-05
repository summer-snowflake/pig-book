import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Tag } from 'types/api'
import KeywordButton from 'components/common/keywordButton'

interface Props {
  tag: Tag;
  onClickCancel: (tag: Tag) => void
}

class TagKeywordButton extends Component<Props> {
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
    const tagId = (
      <span>
        <FontAwesomeIcon className='left-icon light-green' icon={['fas', 'bookmark']} style={colorCodeStyles} />
        {this.props.tag.name ? this.props.tag.name : 'id: ' + this.props.tag.id}
      </span>
    )

    return (
      <span className='tag-keyword-button-component'>
        <KeywordButton
          cancelable
          keyword={tagId}
          onClickCancel={this.handleClickCancelTag}
        />
      </span>
    )
  }
}

export default TagKeywordButton
