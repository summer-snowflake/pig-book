import React from 'react'
import PropTypes from 'prop-types'

import SquareIcon from './../../common/SquareIcon'

class TagPicker extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickPickerButton = this.handleClickPickerButton.bind(this)
  }

  handleClickPickerButton() {
    this.props.onClickPickerButton(this.props.tag)
  }

  render() {
    return (
      <div className='tag-picker-component picker-button' onClick={this.handleClickPickerButton}>
        {this.props.tag.name}
      </div>
    )
  }
}

TagPicker.propTypes = {
  onClickPickerButton: PropTypes.func.isRequired,
  tag: PropTypes.object.isRequired
}

export default TagPicker
