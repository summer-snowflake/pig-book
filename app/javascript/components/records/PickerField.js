import React from 'react'
import PropTypes from 'prop-types'

import CategoryPickers from './CategoryPickers'

class PickerField extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickCategoryPickerButton = this.handleClickCategoryPickerButton.bind(this)
  }

  handleClickCategoryPickerButton(category_id) {
    console.log(category_id)
  }

  render() {
    return (
      <div className='picker-form-component col-md-3'>
        <span className='picker-label'>
          <i className='fas fa-th-large left-icon' />
          {'カテゴリ'}
        </span>
        <CategoryPickers categories={this.props.categories} onClickPickerButton={this.handleClickCategoryPickerButton} />
        <hr />
      </div>
    )
  }
}

PickerField.propTypes = {
  categories: PropTypes.array.isRequired
}

export default PickerField
