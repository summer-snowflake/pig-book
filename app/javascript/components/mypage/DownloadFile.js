import React from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'
import DateFormat from './../common/DateFormat'

class DownloadFile extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <tr className='download-file-component'>
        <td>
          <DateFormat targetDate={moment(this.props.downloadFile.created_at)} />
        </td>
        <td>
          {this.props.downloadFile.filename}
        </td>
        <td>
          {this.props.downloadFile.active ? (
            <a href={'/download_files/' + this.props.downloadFile.id}>{'ダウンロード'}</a>
          ) : (
            <span>{this.props.downloadFile.expired_label}</span>
          )}
        </td>
      </tr>
    )
  }
}

DownloadFile.propTypes = {
  downloadFile: PropTypes.object.isRequired
}

export default DownloadFile
