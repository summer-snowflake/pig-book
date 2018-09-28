import React from 'react'
import PropTypes from 'prop-types'

class CancelButton extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickButton = this.handleClickButton.bind(this)
  }

  handleClickButton() {
    this.props.onClickButton()
  }

  render() {
    return (
      <span className='cancel-button-component'>
        <button className='btn btn-light' id='cancel' onClick={this.handleClickButton}>
          <i className='fas fa-times left-icon' />
          {'キャンセル'}
        </button>
      </span>
    )
  }
}

CancelButton.propTypes = {
  onClickButton: PropTypes.func.isRequired
}

export default CancelButton
