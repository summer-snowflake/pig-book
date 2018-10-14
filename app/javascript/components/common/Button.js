import React from 'react'
import PropTypes from 'prop-types'

class Button extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonType: this.props.buttonType || 'secondary'
    }
    this.handleClickButton = this.handleClickButton.bind(this)
  }

  handleClickButton() {
    this.props.onClickButton()
  }

  render() {
    return (
      <span className={this.props.valueName + '-button-component'}>
        <input className={'btn btn-' + this.state.buttonType} disabled={this.props.isDisabled} id={this.props.valueName + '-button'} onClick={this.handleClickButton} type='submit' value={this.props.humanValueName} />
      </span>
    )
  }
}

Button.propTypes = {
  isDisabled: PropTypes.bool,
  valueName: PropTypes.string.isRequired,
  humanValueName: PropTypes.string.isRequired,
  buttonType: PropTypes.string,
  onClickButton: PropTypes.func.isRequired
}

export default Button
