import React from 'react'
import PropTypes from 'prop-types'

class Button extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickButton = this.handleClickButton.bind(this)
  }

  handleClickButton() {
    this.props.onClickButton()
  }

  render() {
    return (
      <span className={this.props.valueName + '-button-component'}>
        <input className='btn btn-secondary' id={this.props.valueName + '-button'} onClick={this.handleClickButton} type='submit' value={this.props.humanValueName} />
      </span>
    )
  }
}

Button.propTypes = {
  valueName: PropTypes.string.isRequired,
  humanValueName: PropTypes.string.isRequired,
  onClickButton: PropTypes.func.isRequired
}

export default Button
