import React from 'react'
import PropTypes from 'prop-types'

class SubmitButton extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickButton = this.handleClickButton.bind(this)
  }

  handleClickButton() {
    this.props.handleClickButton()
  }

  render() {
    return (
      <span className='submit-button-component'>
        <button className='btn btn-warning' disabled={this.props.isDisabled} id='submit' onClick={this.handleClickButton}>
          {'設定する'}
        </button>
      </span>
    )
  }
}

SubmitButton.propTypes = {
  isDisabled: PropTypes.bool,
  handleClickButton: PropTypes.func.isRequired
}

export default SubmitButton
