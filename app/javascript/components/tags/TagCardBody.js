import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import TagForm from './TagForm'
import Tags from './Tags'
import AlertMessage from './../common/AlertMessage'

class TagCardBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      success: false,
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
            tags: res.data
          })
        }
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
      params: Object.assign(params, {last_request_at: this.props.last_request_at}),
      headers: {
        'Authorization': 'Token token=' + this.props.user_token
      },
      json: true
    }
    axios(options)
      .then((res) => {
        if (res.status == '201') {
          this.getTags()
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

  destroyTag(tag_id) {
    this.setState({
      message: ''
    })
    let options = {
      method: 'DELETE',
      url: origin + '/api/tags/' + tag_id,
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
          this.getTags()
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

  render() {
    return (
      <div className='tag-card-body-component'>
        <AlertMessage message={this.state.message} success={this.state.success} />
        <TagForm errorMessages={this.state.errorMessages} handleSendForm={this.postTag} />
        <Tags handleClickDestroyButton={this.destroyTag} tags={this.state.tags} />
      </div>
    )
  }
}

TagCardBody.propTypes = {
  tags: PropTypes.array.isRequired,
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired
}

export default TagCardBody
