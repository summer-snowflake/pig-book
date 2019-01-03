import React from 'react'
import PropTypes from 'prop-types'
import Record from './Record'
import DestroyModal from './../common/DestroyModal'
import RecordInfoModal from './RecordInfoModal'

class Records extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      destroyModalIsOpen: false,
      recordInfoModalIsOpen: false,
      record: {
        id: null
      }
    }
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
    this.handleClickInfoIcon = this.handleClickInfoIcon.bind(this)
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

  handleClickInfoIcon(record) {
    this.setState({
      record: record,
      recordInfoModalIsOpen: true
    })
  }

  onClickDestroyButton(recordId) {
    this.setState({
      destroyModalIsOpen: false
    })
    this.props.handleClickDestroyButton(recordId)
  }

  closeModal() {
    this.setState({
      destroyModalIsOpen: false,
      recordInfoModalIsOpen: false
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
                isListPage={this.props.isListPage}
                key={record.id}
                onClickEditIcon={this.handleClickEditIcon}
                onClickInfoIcon={this.handleClickInfoIcon}
                onClickTrashIcon={this.handleClickTrashIcon}
                record={record}
              />
            ))}
          </tbody>
        </table>
        <DestroyModal handleClickCloseButton={this.closeModal} handleClickSubmitButton={this.onClickDestroyButton} item={this.state.record} modalIsOpen={this.state.destroyModalIsOpen} />
        <RecordInfoModal handleClickCloseButton={this.closeModal} modalIsOpen={this.state.recordInfoModalIsOpen} record={this.state.record} />
      </div>
    )
  }
}

Records.propTypes = {
  isListPage: PropTypes.bool,
  records: PropTypes.array.isRequired,
  editingRecordId: PropTypes.string,
  handleClickDestroyButton: PropTypes.func.isRequired,
  handleClickEditIcon: PropTypes.func.isRequired
}

export default Records
