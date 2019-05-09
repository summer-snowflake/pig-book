import React from 'react'
import PropTypes from 'prop-types'

import DownloadFile from './DownloadFile'

class DownloadFiles extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <tbody className='download-files-component'>
        {this.props.downloadFiles.map((downloadFile) => (
          <DownloadFile downloadFile={downloadFile} key={downloadFile.id} />
        ))}
      </tbody>
    )
  }
}

DownloadFiles.propTypes = {
  downloadFiles: PropTypes.array.isRequired
}

export default DownloadFiles
