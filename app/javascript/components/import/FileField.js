import React from 'react'
import PropTypes from 'prop-types'

import UploadButton from './../common/UploadButton'

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
        <input className='file-upload-field' id='page_fine_name' name='page[fine_name]' onChange={this.handleChangeFile} ref='file' size='30' type='file' />
        <UploadButton onClickButton={this.handleClick} />
      </div>
    )
  }
}

FileField.propTypes = {
  onUploadFile: PropTypes.func.isRequired
}

export default FileField
