import React from 'react'
import PropTypes from 'prop-types'

class MonthlyTotal extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <td className='monthly-total-component'>
        <div>
          <i className='fas fa-plus-square left-icon blue' />
          {this.props.totalIncome}
        </div>
        <div>
          <i className='fas fa-minus-square left-icon red' />
          {this.props.totalExpenditure}
        </div>
      </td>
    )
  }
}

MonthlyTotal.propTypes = {
  totalIncome: PropTypes.string.isRequired,
  totalExpenditure: PropTypes.string.isRequired
}

export default MonthlyTotal
