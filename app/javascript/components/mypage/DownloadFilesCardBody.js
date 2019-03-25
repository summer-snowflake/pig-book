import React from 'react'
import PropTypes from 'prop-types'

import DownloadFiles from './DownloadFiles'

class DownloadFilesCardBody extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='download-files-card-body-component'>
        <table className='table'>
          <DownloadFiles downloadFiles={this.props.downloadFiles} />
        </table>
      </div>
    )
  }
}
DownloadFilesCardBody.propTypes = {
  downloadFiles: PropTypes.array.isRequired
}

export default DownloadFilesCardBody
