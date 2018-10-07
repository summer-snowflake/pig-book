import React from 'react'
import reactMixin from 'react-mixin'

import FileField from './FileField'
import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import { fileAxios } from './../mixins/requests/ImportHistoriesMixin'

class ImportCardBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errorMessages: {},
      uploading: false,
      isDragOver: false
    }
    this.handleUploadFile = this.handleUploadFile.bind(this)
    this.handleDragEnter = this.handleDragEnter.bind(this)
    this.handleDragLeave = this.handleDragLeave.bind(this)
    this.postFile = this.postFile.bind(this)
    this.postFileCallback = this.postFileCallback.bind(this)
    this.postFileFailure = this.postFileFailure.bind(this)
  }

  handleUploadFile(files) {
    if (files[0] != undefined) {
      let formData = new FormData()
      formData.append('file', files[0])
      formData.append('last_request_at', this.state.lastRequestAt)
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

  postFileCallback() {
    this.noticeAddMessage()
    this.setState({
      uploading: false,
      isDragOver: false
    })
  }

  postFileFailure(error) {
    this.noticeErrorMessages(error)
    this.setState({
      uploading: false,
      isDragOver: false
    })
  }

  postFile(fileParams) {
    this.setState({
      message: '',
      errorMessages: {},
      uploading: true
    })
    fileAxios.post(fileParams, this.postFileCallback, this.postFileFailure)
  }

  render() {
    return (
      <div className='import-card-body-component'>
        <p>
          {'アップロードしたファイル内のデータは、未登録データとしてアップロード明細一覧に追加されます。'}
        </p>
        {this.renderAlertMessage()}
        <FileField isDragOver={this.state.isDragOver} onDragEnter={this.handleDragEnter} onDragLeave={this.handleDragLeave} onUploadFile={this.handleUploadFile} uploading={this.state.uploading} />
      </div>
    )
  }
}

reactMixin.onClass(ImportCardBody, MessageNotifierMixin)

export default ImportCardBody
