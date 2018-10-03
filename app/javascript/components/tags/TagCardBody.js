import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import TagForm from './TagForm'
import Tags from './Tags'
import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import { tagsAxios, tagAxios } from './../mixins/requests/TagsMixin'

class TagCardBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: this.props.tags,
      errorMessages: {}
    }
    this.getTags = this.getTags.bind(this)
    this.getTagsCallback = this.getTagsCallback.bind(this)
    this.postTag = this.postTag.bind(this)
    this.postTagCallback = this.postTagCallback.bind(this)
    this.destroyTag = this.destroyTag.bind(this)
    this.destroyTagCallback = this.destroyTagCallback.bind(this)
    this.noticeErrorMessage = this.noticeErrorMessage.bind(this)
  }

  componentWillMount() {
    this.getTags()
  }

  noticeErrorMessage(error) {
    this.noticeErrorMessages(error)
  }

  getTagsCallback(res) {
    this.setState({
      tags: res.data
    })
  }

  getTags() {
    tagsAxios.get(this.getTagsCallback, this.noticeErrorMessage)
  }

  postTagCallback() {
    this.getTags()
    this.noticeAddMessage()
  }

  postTag(params) {
    this.setState({
      message: '',
      errorMessages: {}
    })
    tagAxios.post(params, this.postTagCallback, this.noticeErrorMessage)
  }

  destroyTagCallback() {
    this.getTags()
    this.noticeDestroyedMessage()
  }

  destroyTag(tagId) {
    this.setState({
      message: ''
    })
    tagAxios.delete(tagId, this.destroyTagCallback, this.noticeErrorMessage)
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

export default TagCardBody
