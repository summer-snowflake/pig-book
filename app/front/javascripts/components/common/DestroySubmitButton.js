import React from 'react'
import PropTypes from 'prop-types'

class DestroySubmitButton extends React.Component {
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
        <button className='btn btn-warning' id='submit' onClick={this.handleClickButton}>
          <i className='far fa-trash-alt left-icon' />
          {'はい'}
        </button>
      </span>
    )
  }
}

DestroySubmitButton.propTypes = {
  handleClickButton: PropTypes.func.isRequired
}

export default DestroySubmitButton
