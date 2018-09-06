import React from 'react'
import PropTypes from 'prop-types'

import SquareIcon from './../common/SquareIcon'

class CategoryPicker extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickPickerButton = this.handleClickPickerButton.bind(this)
  }

  handleClickPickerButton() {
    this.props.onClickPickerButton(this.props.category)
  }

  render() {
    return (
      <div className='category-picker-component picker-button' onClick={this.handleClickPickerButton}>
        <SquareIcon balanceOfPayments={this.props.category.balance_of_payments} />
        {this.props.category.name}
      </div>
    )
  }
}

CategoryPicker.propTypes = {
  onClickPickerButton: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired
}

export default CategoryPicker
