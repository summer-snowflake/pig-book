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
        <CategoryPicker categories={this.props.categories} />
      </div>
    )
  }
}

PickerField.propTypes = {
  categories: PropTypes.array.isRequired
}

export default PickerField
