import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

class MonthlyTotalExpenditure extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      monthlyTotal: this.props.tally.find( data => moment(data.beginning_at).month() == this.props.month )
    }
  }

  render() {
    let defaultNumber = { income: 0, expenditure: 0 }

    return (
      <div className='monthly-total-expenditure-component'>
        <i className='fas fa-minus-square left-icon red' />
        {(this.state.monthlyTotal || {}).human_expenditure || (this.state.monthlyTotal || defaultNumber).expenditure}
      </div>
    )
  }
}

MonthlyTotalExpenditure.propTypes = {
  month: PropTypes.number.isRequired,
  tally: PropTypes.array.isRequired
}

export default MonthlyTotalExpenditure
