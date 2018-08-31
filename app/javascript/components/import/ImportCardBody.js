import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import axios from 'axios'

import FileField from './FileField'
import AlertMessage from './../common/AlertMessage'
import MessageNotifierMixin from './../mixins/MessageNotifierMixin'

class ImportCardBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      success: false,
      errorMessages: {},
      uploading: false,
      isDragOver: false
    }
    this.handleUploadFile = this.handleUploadFile.bind(this)
    this.handleDragEnter = this.handleDragEnter.bind(this)
    this.handleDragLeave = this.handleDragLeave.bind(this)
    this.postFile = this.postFile.bind(this)
  }

  handleUploadFile(files) {
    if (files[0] != undefined) {
      let formData = new FormData()
      formData.append('file', files[0])
      formData.append('last_request_at', this.props.last_request_at)
      this.postFile(formData)
    }
  }

  handleDragEnter() {
    this.setState({
      isDragOver: true
    })
  }

  handleDragLeave() {
    this.setState({
      isDragOver: false
    })
  }

  postFile(fileParams) {
    this.setState({
      message: '',
      errorMessages: {},
      uploading: true
    })
    let url = origin + '/api/import_histories'
    let headers = {'Authorization': 'Token token=' + this.props.user_token }
    axios.post(url, fileParams, { headers: headers })
      .then(() => {
        this.noticeAddMessage()
        this.setState({
          uploading: false,
          isDragOver: false
        })
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
        this.setState({
          uploading: false,
          isDragOver: false
        })
      })
  }

  render() {
    return (
      <div className='import-card-body-component'>
        <AlertMessage message={this.state.message} success={this.state.success} />
        <FileField isDragOver={this.state.isDragOver} onDragEnter={this.handleDragEnter} onDragLeave={this.handleDragLeave} onUploadFile={this.handleUploadFile} uploading={this.state.uploading} />
      </div>
    )
  }
}

ImportCardBody.propTypes = {
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired
}

reactMixin.onClass(ImportCardBody, MessageNotifierMixin)

export default ImportCardBody
