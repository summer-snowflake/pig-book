import React from 'react'
import PropTypes from 'prop-types'

import TagPicker from './TagPicker'

class TagPickers extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickPickerButton = this.handleClickPickerButton.bind(this)
  }

  handleClickPickerButton(tag) {
    this.props.onClickPickerButton(tag)
  }

  render() {
    return (
      <div className='tag-pickers-component'>
        {this.props.tags.map ((tag) =>
          <TagPicker key={tag.id} onClickPickerButton={this.handleClickPickerButton} tag={tag} />
        )}
      </div>
    )
  }
}

TagPickers.propTypes = {
  onClickPickerButton: PropTypes.func.isRequired,
  tags: PropTypes.array.isRequired
}

export default TagPickers
