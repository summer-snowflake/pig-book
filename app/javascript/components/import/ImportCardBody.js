import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import axios from 'axios'

import FileField from './FileField'
import AlertMessage from './../common/AlertMessage'
import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import LocalStorageMixin from './../mixins/LocalStorageMixin'

class ImportCardBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lastRequestAt: this.getLastRequestAt(),
      userToken: this.getUserToken(),
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

  postFile(fileParams) {
    this.setState({
      message: '',
      errorMessages: {},
      uploading: true
    })
    let url = origin + '/api/import_histories'
    let headers = {'Authorization': 'Token token=' + this.state.userToken }
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
        <p>
          {'アップロードしたファイル内のデータは、データインポート前のデータとして未登録データ一覧に表示されます。'}
          <br />
          {'データインポートを完了させるには、未登録データ一覧の画面で対象データを「登録」する必要があります。'}
        </p>
        <AlertMessage message={this.state.message} success={this.state.success} />
        <FileField isDragOver={this.state.isDragOver} onDragEnter={this.handleDragEnter} onDragLeave={this.handleDragLeave} onUploadFile={this.handleUploadFile} uploading={this.state.uploading} />
      </div>
    )
  }
}

reactMixin.onClass(ImportCardBody, MessageNotifierMixin)
reactMixin.onClass(ImportCardBody, LocalStorageMixin)

export default ImportCardBody
