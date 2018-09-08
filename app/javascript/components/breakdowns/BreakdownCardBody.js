import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import axios from 'axios'

import BreakdownForm from './BreakdownForm'
import Breakdowns from './Breakdowns'
import AlertMessage from './../common/AlertMessage'
import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import LocalStorageMixin from './../mixins/LocalStorageMixin'

class BreakdownCardBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lastRequestAt: this.getLastRequestAt(),
      userToken: this.getUserToken(),
      message: '',
      success: false,
      categories: [],
      breakdowns: this.props.breakdowns,
      errorMessages: {}
    }
    this.getBreakdowns = this.getBreakdowns.bind(this)
    this.postBreakdown = this.postBreakdown.bind(this)
    this.destroyBreakdown = this.destroyBreakdown.bind(this)
    this.getCategories = this.getCategories.bind(this)
  }

  componentWillMount() {
    this.getBreakdowns()
  }

  getCategories() {
    let options = {
      method: 'GET',
      url: origin + '/api/categories',
      params: {
        last_request_at: this.state.lastRequestAt
      },
      headers: {
        'Authorization': 'Token token=' + this.state.userToken
      },
      json: true
    }
    axios(options)
      .then((res) => {
        this.setState({
          categories: res.data
        })
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
      })
  }

  getBreakdowns() {
    let options = {
      method: 'GET',
      url: origin + '/api/breakdowns',
      params: {
        last_request_at: this.state.lastRequestAt
      },
      headers: {
        'Authorization': 'Token token=' + this.state.userToken
      },
      json: true
    }
    axios(options)
      .then((res) => {
        this.getCategories()
        this.setState({
          breakdowns: res.data
        })
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
      })
  }

  postBreakdown(params) {
    this.setState({
      message: '',
      errorMessages: {}
    })
    let options = {
      method: 'POST',
      url: origin + '/api/breakdowns',
      params: Object.assign(params, {last_request_at: this.state.lastRequestAt}),
      headers: {
        'Authorization': 'Token token=' + this.state.userToken
      },
      json: true
    }
    axios(options)
      .then(() => {
        this.getBreakdowns()
        this.noticeAddMessage()
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
      })
  }

  destroyBreakdown(breakdown_id) {
    this.setState({
      message: ''
    })
    let options = {
      method: 'DELETE',
      url: origin + '/api/breakdowns/' + breakdown_id,
      params: {
        last_request_at: this.state.lastRequestAt
      },
      headers: {
        'Authorization': 'Token token=' + this.state.userToken
      },
      json: true
    }
    axios(options)
      .then(() => {
        this.getBreakdowns()
        this.noticeDestroyedMessage()
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
      })
  }

  render() {
    return (
      <div className='breakdown-card-body-component'>
        <AlertMessage message={this.state.message} success={this.state.success} />
        <BreakdownForm categories={this.state.categories} errorMessages={this.state.errorMessages} handleSendForm={this.postBreakdown} />
        <Breakdowns breakdowns={this.state.breakdowns} categories={this.state.categories} getBreakdowns={this.getBreakdowns} handleClickDestroyButton={this.destroyBreakdown} />
      </div>
    )
  }
}

BreakdownCardBody.propTypes = {
  breakdowns: PropTypes.array.isRequired,
}

reactMixin.onClass(BreakdownCardBody, MessageNotifierMixin)
reactMixin.onClass(BreakdownCardBody, LocalStorageMixin)

export default BreakdownCardBody
