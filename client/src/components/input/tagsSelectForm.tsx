import React, { Component } from 'react'

import { Tag } from 'types/api'
import TagName from 'components/common/tagName'

interface Props {
  tags: Tag[];
}

class TagsSelectForm extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleClickCancel = this.handleClickCancel.bind(this)
  }

  handleClickCancel(tag: Tag): void {
    console.log(tag)
  }

  render(): JSX.Element {
    return (
      <div className='tags-select-form-component'>
        {this.props.tags.map((tag) => (
          <TagName key={tag.id} tag={tag} onClickCancel={this.handleClickCancel} />
        ))}
      </div>
    )
  }
}

export default TagsSelectForm
