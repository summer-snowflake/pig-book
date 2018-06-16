import React from 'react'
import PropTypes from 'prop-types'

class RecordsForm extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='records-form-component col'>
        {'records list'}
      </div>
    )
  }
}

RecordsForm.propTypes = {
  records: PropTypes.array.isRequired
}

export default RecordsForm
