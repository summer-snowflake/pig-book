import React from 'react'
import PropTypes from 'prop-types'

import FormErrorMessages from './../common/FormErrorMessages'
import UpdateButton from './../common/UpdateButton'

class ImportHistory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      row: this.props.history.row,
      errorMessages: {}
    }
    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
    this.handleClickCancelIcon = this.handleClickCancelIcon.bind(this)
    this.handleChangeRow = this.handleChangeRow.bind(this)
    this.handleClickUpdateButton = this.handleClickUpdateButton.bind(this)
  }

  handleClickEditIcon() {
    this.setState({
      isEditing: true
    })
  }

  handleClickCancelIcon() {
    this.setState({
      isEditing: false
    })
  }

  handleChangeRow(e) {
    this.setState({
      row: e.target.value
    })
  }

  handleClickUpdateButton() {
    console.log('click')
  }

  render() {
    return (
      <tr className='import-history-component'>
        {this.state.isEditing ? (
          <td className='left-edit-target'>
            <input className='form-control' onChange={this.handleChangeRow} type='text' value={this.state.row} />
            <FormErrorMessages column='name' errorMessages={this.state.errorMessages} />
          </td>
        ) : (
          <td className='left-edit-target'>
            {this.props.history.row}
          </td>
        )}
        {this.state.isEditing ? (
          <td className='center-edit-target button-td'>
            <UpdateButton onClickButton={this.handleClickUpdateButton} />
          </td>
        ) : (
          <td className='center-edit-target' />
        )}
        {this.state.isEditing ? (
          <td className='right-edit-target icon-td' onClick={this.handleClickCancelIcon}>
            <i className='fas fa-times' />
          </td>
        ) : (
          <td className='icon-td edit-icon-td right-edit-target' onClick={this.handleClickEditIcon}>
            <i className='fas fa-edit' />
          </td>
        )}
        <td>{this.props.history.messages}</td>
      </tr>
    )
  }
}

ImportHistory.propTypes = {
  history: PropTypes.object.isRequired
}

export default ImportHistory
