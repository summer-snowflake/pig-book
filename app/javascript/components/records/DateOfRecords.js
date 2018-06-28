import React from 'react'
import PropTypes from 'prop-types'
import DateFormat from './../common/DateFormat'

class DateOfRecords extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickPreviousButton = this.handleClickPreviousButton.bind(this)
    this.handleClickNextButton = this.handleClickNextButton.bind(this)
  }

  handleClickPreviousButton() {
    this.props.onClickChangeDateButton(-1)
  }

  handleClickNextButton() {
    this.props.onClickChangeDateButton(1)
  }

  render() {
    return (
      <div className='date-of-records-component'>
        <button className='btn btn-primary btn-sm float-left' onClick={this.handleClickPreviousButton}>
          <i className='fas fa-chevron-left' />
        </button>
        <DateFormat targetDate={this.props.targetDate} />
        <button className='btn btn-primary btn-sm float-right' onClick={this.handleClickNextButton}>
          <i className='fas fa-chevron-right' />
        </button>
      </div>
    )
  }
}

DateOfRecords.propTypes = {
  targetDate: PropTypes.object.isRequired,
  onClickChangeDateButton: PropTypes.func.isRequired
}

export default DateOfRecords
