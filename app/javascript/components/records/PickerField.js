import React from 'react'

import CategoryPicker from './CategoryPicker'

class PickerField extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='picker-form-component col-md-3'>
        <CategoryPicker />
      </div>
    )
  }
}

export default PickerField
