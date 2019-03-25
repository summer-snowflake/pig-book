import React from 'react'
import PropTypes from 'prop-types'

class DownloadFiles extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <tbody className='download-files-component'>
        {this.props.downloadFiles.map((downloadFile) => (
          <tr key={downloadFile.id}>
            <td>{downloadFile.filename}</td>
          </tr>
        ))}
      </tbody>
    )
  }
}
DownloadFiles.propTypes = {
  downloadFiles: PropTypes.array.isRequired
}

export default DownloadFiles
