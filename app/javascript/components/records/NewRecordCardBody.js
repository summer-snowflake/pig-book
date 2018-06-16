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
      breakdowns: []
    }
    this.postRecord = this.postRecord.bind(this)
    this.getCategories = this.getCategories.bind(this)
    this.onSelectCategory = this.onSelectCategory.bind(this)
  }

  onSelectCategory(categoryId) {
    console.log(categoryId)
  }

  postRecord() {
    console.log('post new record')
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
        <NewRecordForm breakdowns={this.state.breakdowns} categories={this.state.categories} errorMessages={this.state.errorMessages} getCategories={this.getCategories} handleSelectCategory={this.onSelectCategory} handleSendForm={this.postRecord} />
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
