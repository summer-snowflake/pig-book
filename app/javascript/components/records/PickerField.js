import React from 'react'
import PropTypes from 'prop-types'

import CategoryPicker from './CategoryPicker'

class PickerField extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='picker-form-component col-md-3'>
        <span className='picker-label'>
          <i className='fas fa-th-large left-icon' />
          {'カテゴリ'}
        </span>
        <CategoryPicker categories={this.props.categories} />
        <hr />
      </div>
    )
  }
}

PickerField.propTypes = {
  categories: PropTypes.array.isRequired
}

export default PickerField
