import React, { Component } from 'react'
import RecordForm from './recordForm'

class NewRecordFormContainer extends Component {
  render(): JSX.Element {
    return (
      <div className='new-record-form-component col-md-4'>
        <RecordForm />
      </div>
    )
  }
}

export default NewRecordFormContainer
