import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import DownloadFiles from './DownloadFiles'
import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import { downloadFilesAxios } from './../mixins/requests/DownloadFilesMixin'

class DownloadFilesCardBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      downloadFiles: this.props.downloadFiles
    }
    this.getDownloadFiles = this.getDownloadFiles.bind(this)
    this.getDownloadFilesCallback = this.getDownloadFilesCallback.bind(this)
    this.noticeErrorMessages = this.noticeErrorMessages.bind(this)
  }

  componentWillMount() {
    this.getDownloadFiles()
  }

  getDownloadFiles() {
    downloadFilesAxios.get(this.getDownloadFilesCallback, this.noticeErrorMessages)
  }

  getDownloadFilesCallback(res) {
    this.setState({
      downloadFiles: res.data
    })
  }

  render() {
    return (
      <div className='download-files-card-body-component'>
        <table className='table'>
          <DownloadFiles downloadFiles={this.state.downloadFiles} />
        </table>
      </div>
    )
  }
}

DownloadFilesCardBody.propTypes = {
  downloadFiles: PropTypes.array.isRequired
}

reactMixin.onClass(DownloadFilesCardBody, MessageNotifierMixin)

export default DownloadFilesCardBody
