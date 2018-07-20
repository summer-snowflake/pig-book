import React from 'react'
import PropTypes from 'prop-types'
import Record from './Record'
import DestroyModal from './../common/DestroyModal'

class Records extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      destroyModalIsOpen: false,
      record: {
        id: null
      }
    }
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.onClickDestroyButton = this.onClickDestroyButton.bind(this)
  }

  handleClickTrashIcon(record) {
    this.setState({
      record: record,
      destroyModalIsOpen: true
    })
  }

  handleClickEditIcon(recordId) {
    this.props.handleClickEditIcon(recordId)
  }

  onClickDestroyButton(recordId) {
    this.setState({
      destroyModalIsOpen: false
    })
    this.props.handleClickDestroyButton(recordId)
  }

  closeModal() {
    this.setState({
      destroyModalIsOpen: false
    })
  }

  render() {
    return (
      <div className='records-component'>
        <table className='table'>
          <tbody>
            {this.props.records.map((record) => (
              <Record
                editingRecordId={this.props.editingRecordId}
                key={record.id}
                onClickEditIcon={this.handleClickEditIcon}
                onClickTrashIcon={this.handleClickTrashIcon}
                record={record}
              />
            ))}
          </tbody>
        </table>
        <DestroyModal handleClickCloseButton={this.closeModal} handleClickSubmitButton={this.onClickDestroyButton} item={this.state.record} modalIsOpen={this.state.destroyModalIsOpen} />
      </div>
    )
  }
}

Records.propTypes = {
  records: PropTypes.array.isRequired,
  editingRecordId: PropTypes.number,
  handleClickDestroyButton: PropTypes.func.isRequired,
  handleClickEditIcon: PropTypes.func.isRequired
}

export default Records
