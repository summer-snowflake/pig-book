import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import moment from 'moment'
import NewRecordForm from './NewRecordForm'
import AlertMessage from './../common/AlertMessage'
import PickerField from './PickerField'
import Records from './Records'
import DateOfRecords from './DateOfRecords'

class NewRecordCardBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      success: false,
      errorMessages: {},
      baseSetting: {},
      categories: [],
      breakdowns: [],
      places: [],
      records: this.props.records,
      targetDate: moment()
    }
    this.postRecord = this.postRecord.bind(this)
    this.getBaseSetting = this.getBaseSetting.bind(this)
    this.getCategories = this.getCategories.bind(this)
    this.onSelectCategory = this.onSelectCategory.bind(this)
    this.getRecords = this.getRecords.bind(this)
    this.destroyRecord = this.destroyRecord.bind(this)
    this.setStateDate = this.setStateDate.bind(this)
    this.handleClickChangeDateButton = this.handleClickChangeDateButton.bind(this)
  }

  componentWillMount() {
    this.getBaseSetting()
  }

  onSelectCategory(category) {
    this.setState({
      breakdowns: (category || {}).breakdowns || [],
      places: (category || {}).places || []
    })
  }

  setStateDate(date) {
    this.setState({
      selectedY: date.year(),
      selectedM: date.month() + 1,
      selectedD: date.date()
    })
    this.getRecords(date)
  }

  getRecords(date) {
    let targetDate = date ? date : moment()
    let options = {
      method: 'GET',
      url: origin + '/api/records',
      params: {
        last_request_at: this.props.last_request_at,
        y: targetDate.year(),
        m: targetDate.month() + 1,
        d: targetDate.date()
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
            records: res.data,
            targetDate: targetDate
          })
        }
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
          this.getRecords(params.published_at)
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

  getBaseSetting() {
    let options = {
      method: 'GET',
      url: origin + '/api/base_setting',
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
        this.getCategories()
        if(res.status == '200') {
          this.setState({
            baseSetting: res.data
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
          this.getRecords()
          this.setState({
            categories: res.data
          })
        }
      })
  }

  destroyRecord(recordId) {
    this.setState({
      message: ''
    })
    let options = {
      method: 'DELETE',
      url: origin + '/api/records/' + recordId,
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
        if(res.status == '204') {
          this.getRecords()
          this.setState({
            message: '削除しました',
            success: true
          })
        }
      })
      .catch((error) => {
        this.setState({
          message: error.response.data.error_message,
          success: false
        })
        console.error(error)
      })
  }

  handleClickChangeDateButton(days) {
    const changeDate = this.state.targetDate.add('days', days)
    this.setState({
      targetDate: changeDate
    })
    this.getRecords(changeDate)
  }

  render() {
    return (
      <div className='new-record-card-body-component row'>
        <AlertMessage message={this.state.message} success={this.state.success} />
        <PickerField />
        <NewRecordForm baseSetting={this.state.baseSetting} breakdowns={this.state.breakdowns} categories={this.state.categories} errorMessages={this.state.errorMessages} handleChangePublishedOn={this.setStateDate} handleSelectCategory={this.onSelectCategory} handleSendForm={this.postRecord} places={this.state.places} ref='form' />
        <div className='card col'>
          <div className='card-body'>
            <DateOfRecords onClickChangeDateButton={this.handleClickChangeDateButton} targetDate={this.state.targetDate} />
            <Records handleClickDestroyButton={this.destroyRecord} records={this.state.records} />
          </div>
        </div>
      </div>
    )
  }
}

NewRecordCardBody.propTypes = {
  records: PropTypes.array.isRequired,
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired
}

export default NewRecordCardBody
