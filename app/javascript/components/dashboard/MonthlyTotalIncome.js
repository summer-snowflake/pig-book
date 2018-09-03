import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

class MonthlyTotalIncome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      monthlyTotal: this.props.tally.find( data => (moment(data.beginning_at).month() + 1) == this.props.month )
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      monthlyTotal: nextProps.tally.find( data => (moment(data.beginning_at).month() + 1) == this.props.month )
    })
  }

  render() {
    let defaultNumber = { income: 0, expenditure: 0 }

    return (
      <div className='monthly-total-income-component'>
        <i className='fas fa-plus-square left-icon blue' />
        {(this.state.monthlyTotal || {}).human_income || (this.state.monthlyTotal || defaultNumber).income}
      </div>
    )
  }
}

MonthlyTotalIncome.propTypes = {
  month: PropTypes.number.isRequired,
  tally: PropTypes.array.isRequired
}

export default MonthlyTotalIncome
