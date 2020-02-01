import React from 'react'
import PropTypes from 'prop-types'
import Records from './../Records'
import DateOfRecords from './DateOfRecords'

class RelatedRecords extends React.Component {
  constructor(props) {
    super(props)
    this.onClickDestroyButton = this.onClickDestroyButton.bind(this)
    this.handleClickChangeDateButton = this.handleClickChangeDateButton.bind(this)
    this.onClickEditIcon = this.onClickEditIcon.bind(this)
    this.onClickCopyIcon = this.onClickCopyIcon.bind(this)
  }

  handleClickChangeDateButton(days) {
    this.props.handleClickChangeDateButton(days)
  }

  onClickDestroyButton(recordId) {
    this.props.handleClickDestroyButton(recordId)
  }

  onClickEditIcon(recordId) {
    this.props.handleClickEditIcon(recordId)
  }

  onClickCopyIcon(recordId) {
    this.props.handleClickCopyIcon(recordId)
  }

  render() {
    return (
      <div className='card col related-records-component'>
        <div className='card-body'>
          <DateOfRecords onClickChangeDateButton={this.handleClickChangeDateButton} targetDate={this.props.targetDate} />
          <Records
            editingRecordId={this.props.editingRecordId}
            handleClickCopyIcon={this.onClickCopyIcon}
            handleClickDestroyButton={this.onClickDestroyButton}
            handleClickEditIcon={this.onClickEditIcon}
            records={this.props.records}
          />
        </div>
        {this.props.recordsByCategory.length > 0 && (
          <div className='card-body'>
            <div className='category-records-title'>
              {this.props.recordsByCategory[0].category_name}
            </div>
            <Records
              editingRecordId={this.props.editingRecordId}
              handleClickCopyIcon={this.onClickCopyIcon}
              handleClickDestroyButton={this.onClickDestroyButton}
              handleClickEditIcon={this.onClickEditIcon}
              longEnabled
              records={this.props.recordsByCategory}
            />
          </div>
        )}
      </div>
    )
  }
}

RelatedRecords.propTypes = {
  targetDate: PropTypes.object.isRequired,
  records: PropTypes.array.isRequired,
  recordsByCategory: PropTypes.array.isRequired,
  editingRecordId: PropTypes.string,
  handleClickEditIcon: PropTypes.func.isRequired,
  handleClickCopyIcon: PropTypes.func.isRequired,
  handleClickDestroyButton: PropTypes.func.isRequired,
  handleClickChangeDateButton: PropTypes.func.isRequired
}

export default RelatedRecords
