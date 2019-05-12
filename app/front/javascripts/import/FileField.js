import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'

class FileField extends React.Component {
  constructor(props) {
    super(props)
    this.handleDropFile = this.handleDropFile.bind(this)
    this.handleDragEnter = this.handleDragEnter.bind(this)
    this.handleDragLeave = this.handleDragLeave.bind(this)
  }

  handleDropFile(acceptedFiles) {
    this.props.onUploadFile(acceptedFiles)
  }

  handleDragEnter() {
    this.props.onDragEnter()
  }

  handleDragLeave() {
    this.props.onDragLeave()
  }

  render() {
    return (
      <div className='file-field-component'>
        <Dropzone className={'file-upload-field ' + (this.props.isDragOver ? 'is-dragover' : '')} onDragEnter={this.handleDragEnter} onDragLeave={this.handleDragLeave} onDrop={this.handleDropFile}>
          <p>
            {this.props.uploading ? (
              <span className='file-field-loading-image' />
            ) : (
              <span>
                <i className='fas fa-file left-icon' />
                {'ここにCSVファイルをドラッグ、またはクリックしてファイルをアップロードします。'}
              </span>
            )}
          </p>
        </Dropzone>
      </div>
    )
  }
}

FileField.propTypes = {
  onUploadFile: PropTypes.func.isRequired,
  uploading: PropTypes.bool.isRequired,
  isDragOver: PropTypes.bool.isRequired,
  onDragEnter: PropTypes.func.isRequired,
  onDragLeave: PropTypes.func.isRequired
}

export default FileField
