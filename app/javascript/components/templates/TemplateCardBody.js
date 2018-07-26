import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import axios from 'axios'
import TemplateForm from './TemplateForm'
import Templates from './Templates'
import AlertMessage from './../common/AlertMessage'
import MessageNotifierMixin from './../mixins/MessageNotifierMixin'

class TemplateCardBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      success: false,
      categories: [],
      tags: [],
      templates: this.props.templates,
      errorMessages: {}
    }
    this.getTemplates = this.getTemplates.bind(this)
    this.postTemplate = this.postTemplate.bind(this)
    this.destroyTemplate = this.destroyTemplate.bind(this)
    this.getCategories = this.getCategories.bind(this)
    this.getTags = this.getTags.bind(this)
  }

  componentWillMount() {
    this.getTags()
  }

  getTags() {
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
        this.getTemplates()
        this.setState({
          tags: res.data
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
        this.setState({
          categories: res.data
        })
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
      })
  }

  getTemplates() {
    let options = {
      method: 'GET',
      url: origin + '/api/templates',
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
          templates: res.data
        })
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
      })
  }

  postTemplate(params) {
    this.setState({
      message: '',
      errorMessages: {}
    })
    let options = {
      method: 'POST',
      url: origin + '/api/templates',
      params: Object.assign(params, {last_request_at: this.props.last_request_at}),
      headers: {
        'Authorization': 'Token token=' + this.props.user_token
      },
      json: true
    }
    axios(options)
      .then(() => {
        this.getTemplates()
        this.noticeAddMessage()
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
      })
  }

  destroyTemplate(template_id) {
    this.setState({
      message: ''
    })
    let options = {
      method: 'DELETE',
      url: origin + '/api/templates/' + template_id,
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
        this.getTemplates()
        this.noticeDestroyedMessage()
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
      })
  }

  render() {
    return (
      <div className='template-card-body-component'>
        <AlertMessage message={this.state.message} success={this.state.success} />
        <TemplateForm categories={this.state.categories} errorMessages={this.state.errorMessages} handleSendForm={this.postTemplate} tags={this.state.tags} />
        <Templates categories={this.state.categories} getTemplates={this.getTemplates} handleClickDestroyButton={this.destroyTemplate} last_request_at={this.props.last_request_at} templates={this.state.templates} user_token={this.props.user_token} />
      </div>
    )
  }
}

TemplateCardBody.propTypes = {
  templates: PropTypes.array.isRequired,
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired
}

reactMixin.onClass(TemplateCardBody, MessageNotifierMixin)

export default TemplateCardBody
