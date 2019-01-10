import React from 'react'
import PropTypes from 'prop-types'

class MonthlyTotalExpenditure extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      monthlyTotal: { human_expenditure: '¥0' }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      monthlyTotal: nextProps.tally.find( data => data.month == this.props.month )
    })
  }

  render() {
    return (
      <div className='monthly-total-expenditure-component'>
        <i className='fas fa-minus-square left-icon red' />
        {this.state.monthlyTotal.human_expenditure}
      </div>
    )
  }
}

MonthlyTotalExpenditure.propTypes = {
  month: PropTypes.number.isRequired,
  tally: PropTypes.array
}

export default MonthlyTotalExpenditure
