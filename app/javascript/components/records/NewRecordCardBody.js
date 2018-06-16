import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
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
      errorMessages: {},
      categories: [],
      breakdowns: [],
      places: []
    }
    this.postRecord = this.postRecord.bind(this)
    this.getCategories = this.getCategories.bind(this)
    this.onSelectCategory = this.onSelectCategory.bind(this)
  }

  onSelectCategory(category) {
    this.setState({
      breakdowns: (category || {}).breakdowns || [],
      places: (category || {}).places || []
    })
  }

  postRecord(params) {
    this.setState({
      message: '',
      errorMessages: {}
    })
    let options = {
      method: 'POST',
      url: origin + '/api/records',
      params: Object.assign(params, {last_request_at: this.props.last_request_at}),
      headers: {
        'Authorization': 'Token token=' + this.props.user_token
      },
      json: true
    }
    axios(options)
      .then((res) => {
        if (res.status == '201') {
          this.refs.form.refs.charge.value = ''
          this.refs.form.refs.memo.value = ''
          this.setState({
            message: '追加しました',
            success: true
          })
        }
      })
      .catch((error) => {
        if (error.response.status == '422') {
          this.setState({
            errorMessages: error.response.data.error_messages
          })
        } else {
          this.setState({
            message: error.response.data.error_message,
            success: false
          })
        }
      })
  }

  getCategories() {
    let options = {
      method: 'GET',
      url: origin + '/api/categories',
      params: {
        last_request_at: this.props.last_request_at
      },
      headers: {
        'Authorization': 'Token token=' + this.props.user_token
      },
      json: true
    }
    axios(options)
      .then((res) => {
        if(res.status == '200') {
          this.setState({
            categories: res.data
          })
        }
      })
  }

  render() {
    return (
      <div className='new-record-card-body-component row'>
        <AlertMessage message={this.state.message} success={this.state.success} />
        <PickerField />
        <NewRecordForm breakdowns={this.state.breakdowns} categories={this.state.categories} errorMessages={this.state.errorMessages} getCategories={this.getCategories} handleSelectCategory={this.onSelectCategory} handleSendForm={this.postRecord} places={this.state.places} ref='form' />
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
