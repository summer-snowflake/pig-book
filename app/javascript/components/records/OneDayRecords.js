import React from 'react'
import PropTypes from 'prop-types'
import Records from './Records'
import DateOfRecords from './DateOfRecords'

class OneDayRecords extends React.Component {
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
      <div className='card col one-day-records-component'>
        <div className='card-body'>
          <DateOfRecords onClickChangeDateButton={this.handleClickChangeDateButton} targetDate={this.props.targetDate} />
          <Records handleClickDestroyButton={this.onClickDestroyButton} handleClickEditIcon={this.onClickEditIcon} records={this.props.records} />
        </div>
      </div>
    )
  }
}

OneDayRecords.propTypes = {
  targetDate: PropTypes.object.isRequired,
  records: PropTypes.array.isRequired,
  handleClickEditIcon: PropTypes.func.isRequired,
  handleClickDestroyButton: PropTypes.func.isRequired,
  handleClickChangeDateButton: PropTypes.func.isRequired
}

export default OneDayRecords
