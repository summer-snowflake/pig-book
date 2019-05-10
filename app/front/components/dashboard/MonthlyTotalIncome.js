import React from 'react'
import PropTypes from 'prop-types'

class MonthlyTotalIncome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      monthlyTotal: { human_income: '¥0' }
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      monthlyTotal: nextProps.tally.find( data => data.month == this.props.month )
    })
  }

  render() {
    return (
      <div className='monthly-total-income-component'>
        <i className='fas fa-plus-square left-icon blue' />
        {(this.state.monthlyTotal || {}).human_income}
      </div>
    )
  }
}

MonthlyTotalIncome.propTypes = {
  month: PropTypes.number.isRequired,
  tally: PropTypes.array
}

export default MonthlyTotalIncome
