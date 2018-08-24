import React from 'react'
import PropTypes from 'prop-types'

class FileField extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleChangeFile = this.handleChangeFile.bind(this)
  }

  handleClick() {
    this.refs.file.click()
  }

  handleChangeFile(e) {
    this.props.onUploadFile(e.target.files)
  }

  render() {
    return (
      <div className='file-field-component'>
        <div className='file-upload-field' onClick={this.handleClick}>
          <p>
            {this.refs.file == undefined || this.props.uploaded ? (
              <span>
                <i className='fas fa-file left-icon' />
                {'ここにファイルをドラッグ、またはクリックしてファイルをアップロードします。'}
              </span>
            ) : (
              <span className='loading-image' />
            )}
          </p>
          <div>
            <input className='file-upload' id='page_fine_name' name='page[fine_name]' onChange={this.handleChangeFile} ref='file' size='30' type='file' />
          </div>
        </div>
      </div>
    )
  }
}

FileField.propTypes = {
  onUploadFile: PropTypes.func.isRequired,
  uploaded: PropTypes.bool.isRequired
}

export default FileField
