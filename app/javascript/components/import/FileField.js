import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'

class FileField extends React.Component {
  constructor(props) {
    super(props)
    this.handleDropFile = this.handleDropFile.bind(this)
  }

  handleDropFile(acceptedFiles) {
    this.props.onUploadFile(acceptedFiles)
  }

  render() {
    return (
      <div className='file-field-component'>
        <div className='file-upload-fieldd'>
          <Dropzone className='file-upload-field' onDrop={this.handleDropFile}>
            <p>
              {this.props.uploading ? (
                <span className='loading-image' />
              ) : (
                <span>
                  <i className='fas fa-file left-icon' />
                  {'ここにCSVファイルをドラッグ、またはクリックしてファイルをアップロードします。'}
                </span>
              )}
            </p>
          </Dropzone>
        </div>
      </div>
    )
  }
}

FileField.propTypes = {
  onUploadFile: PropTypes.func.isRequired,
  uploading: PropTypes.bool.isRequired
}

export default FileField
