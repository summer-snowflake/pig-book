import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import axios from 'axios'
import moment from 'moment'
import NewRecordForm from './NewRecordForm'
import AlertMessage from './../common/AlertMessage'
import PickerField from './PickerField'
import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import OneDayRecords from './OneDayRecords'

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
      tags: [],
      selectTags: [],
      selectedTags: {},
      records: this.props.records,
      targetDate: moment(),
      editingRecord: null
    }
    this.postRecord = this.postRecord.bind(this)
    this.getBaseSetting = this.getBaseSetting.bind(this)
    this.getCategories = this.getCategories.bind(this)
    this.getTags = this.getTags.bind(this)
    this.onSelectCategory = this.onSelectCategory.bind(this)
    this.getRecords = this.getRecords.bind(this)
    this.getRecord = this.getRecord.bind(this)
    this.destroyRecord = this.destroyRecord.bind(this)
    this.setStateDate = this.setStateDate.bind(this)
    this.onClickChangeDateButton = this.onClickChangeDateButton.bind(this)
    this.handleUpdateTags = this.handleUpdateTags.bind(this)
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
        date: String(targetDate)
      },
      headers: {
        'Authorization': 'Token token=' + this.props.user_token
      },
      json: true
    }
    axios(options)
      .then((res) => {
        this.getTags()
        this.setState({
          records: res.data,
          targetDate: targetDate
        })
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
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
      .then(() => {
        this.refs.form.refs.charge.value = ''
        this.refs.form.refs.memo.value = ''
        this.getRecords(params.published_at)
        this.noticeAddMessage()
        this.setState({
          selectTags: [],
          selectedTags: {}
        })
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
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
        this.setState({
          baseSetting: res.data
        })
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
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
        this.getRecords()
        this.setState({
          categories: res.data
        })
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
      })
  }

  getTags() {
    this.setState({
      message: ''
    })
    let options = {
      method: 'GET',
      url: origin + '/api/tags',
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
        this.setState({
          tags: res.data
        })
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
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
      .then(() => {
        this.getRecords()
        this.noticeDestroyedMessage()
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
      })
  }

  onClickChangeDateButton(days) {
    const changeDate = this.state.targetDate.add('days', days)
    this.setState({
      targetDate: changeDate
    })
    this.getRecords(changeDate)
  }

  getRecord(recordId) {
    let options = {
      method: 'GET',
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
        console.log('get record')
        this.setState({
          editingRecord: res.data
        })
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
      })
  }

  handleUpdateTags(tags) {
    this.setState({
      selectTags: tags,
      selectedTags: this.generateTags(tags)
    })
  }

  generateTags(tags) {
    const hash = {}
    for (let key in tags) {
      if (tags[key].props != undefined) {
        let color = tags[key].props.children[0].props.style.background
        let name = tags[key].props.children[1].props.children
        hash[key] = {color: color, name: name}
      } else {
        hash[key] = {color: '', name: tags[key]}
      }
    }
    return hash
  }

  render() {
    return (
      <div className='new-record-card-body-component row'>
        <AlertMessage message={this.state.message} success={this.state.success} />
        <PickerField />
        <NewRecordForm
          baseSetting={this.state.baseSetting}
          breakdowns={this.state.breakdowns}
          categories={this.state.categories}
          errorMessages={this.state.errorMessages}
          handleChangePublishedOn={this.setStateDate}
          handleSelectCategory={this.onSelectCategory}
          handleSendForm={this.postRecord}
          last_request_at={this.props.last_request_at}
          onUpdateTags={this.handleUpdateTags}
          places={this.state.places}
          ref='form'
          selectTags={this.state.selectTags}
          selectedTags={this.state.selectedTags}
          tags={this.state.tags}
          user_token={this.props.user_token}
        />
        <OneDayRecords
          handleClickChangeDateButton={this.onClickChangeDateButton}
          handleClickDestroyButton={this.destroyRecord}
          handleClickEditIcon={this.getRecord}
          records={this.state.records}
          targetDate={this.state.targetDate}
        />
      </div>
    )
  }
}

NewRecordCardBody.propTypes = {
  records: PropTypes.array.isRequired,
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired
}

reactMixin.onClass(NewRecordCardBody, MessageNotifierMixin)

export default NewRecordCardBody
