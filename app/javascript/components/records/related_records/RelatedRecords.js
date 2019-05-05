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

  render() {
    return (
      <div className='card col related-records-component'>
        <div className='card-body'>
          <DateOfRecords onClickChangeDateButton={this.handleClickChangeDateButton} targetDate={this.props.targetDate} />
          <Records
            editingRecordId={this.props.editingRecordId}
            handleClickDestroyButton={this.onClickDestroyButton}
            handleClickEditIcon={this.onClickEditIcon}
            records={this.props.records}
          />
        </div>
      </div>
    )
  }
}

RelatedRecords.propTypes = {
  targetDate: PropTypes.object.isRequired,
  records: PropTypes.array.isRequired,
  editingRecordId: PropTypes.string,
  handleClickEditIcon: PropTypes.func.isRequired,
  handleClickDestroyButton: PropTypes.func.isRequired,
  handleClickChangeDateButton: PropTypes.func.isRequired
}

export default RelatedRecords
