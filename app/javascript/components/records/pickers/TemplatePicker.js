import React from 'react'
import PropTypes from 'prop-types'

import SquareIcon from './../../common/SquareIcon'

class TemplatePicker extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickPickerButton = this.handleClickPickerButton.bind(this)
  }

  handleClickPickerButton() {
    this.props.onClickPickerButton(this.props.template)
  }

  render() {
    return (
      <div className='template-picker-component picker-button' onClick={this.handleClickPickerButton}>
        <SquareIcon balanceOfPayments={this.props.template.category_balance_of_payments} />
        {this.props.template.name}
      </div>
    )
  }
}

TemplatePicker.propTypes = {
  onClickPickerButton: PropTypes.func.isRequired,
  template: PropTypes.object.isRequired
}

export default TemplatePicker
