import React from 'react'
import PropTypes from 'prop-types'

class MonthlyTotal extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let incomeTotal = 0
    let expenditureTotal = 0
    if (this.props.tally) {
      incomeTotal = this.props.tally.map ((t) => t.income).reduce((acc, cur) => acc + cur)
      expenditureTotal = this.props.tally.map ((t) => t.expenditure).reduce((acc, cur) => acc + cur)
    }

    return (
      <td className='monthly-total-component'>
        <div>
          <i className='fas fa-plus-square left-icon blue' />
          {incomeTotal}
        </div>
        <div>
          <i className='fas fa-minus-square left-icon red' />
          {expenditureTotal}
        </div>
      </td>
    )
  }
}

MonthlyTotal.propTypes = {
  tally: PropTypes.array
}

export default MonthlyTotal
