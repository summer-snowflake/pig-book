import React from 'react'
import PropTypes from 'prop-types'

class CloseButton extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickButton = this.handleClickButton.bind(this)
  }

  handleClickButton() {
    this.props.handleClickButton()
  }

  render() {
    return (
      <span className='close-button-component'>
        <button className='btn btn-light' id='cancel' onClick={this.handleClickButton}>
          <i className='fas fa-times left-icon' />
          {'閉じる'}
        </button>
      </span>
    )
  }
}

CloseButton.propTypes = {
  handleClickButton: PropTypes.func.isRequired
}

export default CloseButton
