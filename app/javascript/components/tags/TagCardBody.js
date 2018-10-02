import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import axios from 'axios'

import TagForm from './TagForm'
import Tags from './Tags'
import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import LocalStorageMixin from './../mixins/LocalStorageMixin'

class TagCardBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lastRequestAt: this.getLastRequestAt(),
      userToken: this.getUserToken(),
      tags: this.props.tags,
      errorMessages: {}
    }
    this.destroyTag = this.destroyTag.bind(this)
    this.getTags = this.getTags.bind(this)
    this.postTag = this.postTag.bind(this)
  }

  componentWillMount() {
    this.getTags()
  }

  getTags() {
    let options = {
      method: 'GET',
      url: origin + '/api/tags',
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
          tags: res.data
        })
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
      })
  }

  postTag(params) {
    this.setState({
      message: '',
      errorMessages: {}
    })
    let options = {
      method: 'POST',
      url: origin + '/api/tags',
      params: Object.assign(params, {last_request_at: this.state.lastRequestAt}),
      headers: {
        'Authorization': 'Token token=' + this.state.userToken
      },
      json: true
    }
    axios(options)
      .then(() => {
        this.getTags()
        this.noticeAddMessage()
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
      })
  }

  destroyTag(tag_id) {
    this.setState({
      message: ''
    })
    let options = {
      method: 'DELETE',
      url: origin + '/api/tags/' + tag_id,
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
        this.getTags()
        this.noticeDestroyedMessage()
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
      })
  }

  render() {
    return (
      <div className='tag-card-body-component'>
        {this.renderAlertMessage()}
        <TagForm errorMessages={this.state.errorMessages} handleSendForm={this.postTag} />
        <Tags getTags={this.getTags} handleClickDestroyButton={this.destroyTag} tags={this.state.tags} />
      </div>
    )
  }
}

TagCardBody.propTypes = {
  tags: PropTypes.array.isRequired
}

reactMixin.onClass(TagCardBody, MessageNotifierMixin)
reactMixin.onClass(TagCardBody, LocalStorageMixin)

export default TagCardBody
