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
    this.handleClickBreakdown = this.handleClickBreakdown.bind(this)
    this.handleClickCategory = this.handleClickCategory.bind(this)
    this.handleClickPlace = this.handleClickPlace.bind(this)
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
    this.handleClickInfoIcon = this.handleClickInfoIcon.bind(this)
    this.handleClickCopyIcon = this.handleClickCopyIcon.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.onClickDestroyButton = this.onClickDestroyButton.bind(this)
  }

  handleClickBreakdown(breakdownId, breakdownName) {
    this.props.handleClickBreakdown(breakdownId, breakdownName)
  }

  handleClickCategory(categoryId, categoryName) {
    this.props.handleClickCategory(categoryId, categoryName)
  }

  handleClickPlace(placeId, placeName) {
    this.props.handleClickPlace(placeId, placeName)
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

  handleClickCopyIcon(recordId) {
    this.props.handleClickCopyIcon(recordId)
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
                key={record.id}
                longEnabled={this.props.longEnabled}
                onClickBreakdown={this.handleClickBreakdown}
                onClickCategory={this.handleClickCategory}
                onClickCopyIcon={this.handleClickCopyIcon}
                onClickEditIcon={this.handleClickEditIcon}
                onClickInfoIcon={this.handleClickInfoIcon}
                onClickPlace={this.handleClickPlace}
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
  longEnabled: PropTypes.bool,
  records: PropTypes.array.isRequired,
  editingRecordId: PropTypes.string,
  handleClickCategory: PropTypes.func,
  handleClickPlace: PropTypes.func,
  handleClickBreakdown: PropTypes.func,
  handleClickDestroyButton: PropTypes.func.isRequired,
  handleClickEditIcon: PropTypes.func,
  handleClickCopyIcon: PropTypes.func
}

export default Records
