import React from 'react'
import PropTypes from 'prop-types'
import NewRecordForm from './NewRecordForm'
import AlertMessage from './../common/AlertMessage'
import PickerField from './PickerField'
import Records from './Records'

class NewRecordCardBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      success: false,
      errorMessages: {}
    }
    this.postRecord = this.postRecord.bind(this)
  }

  postRecord() {
    console.log('post new record')
  }

  render() {
    return (
      <div className='new-record-card-body-component row'>
        <AlertMessage message={this.state.message} success={this.state.success} />
        <PickerField />
        <NewRecordForm errorMessages={this.state.errorMessages} handleSendForm={this.postRecord} />
        <Records records={[]}/>
      </div>
    )
  }
}

NewRecordCardBody.propTypes = {
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired
}

export default NewRecordCardBody
