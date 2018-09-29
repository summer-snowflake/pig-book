import React from 'react'
import PropTypes from 'prop-types'

class MonthlyTotal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      incomeTotal: 0,
      expenditureTotal: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.tally || []).map ((t) => t.income).length != 0) {
      this.setState({
        incomeTotal: nextProps.tally.map ((t) => t.income).reduce((acc, cur) => acc + cur),
        expenditureTotal: nextProps.tally.map ((t) => t.expenditure).reduce((acc, cur) => acc + cur)
      })
    }
  }

  render() {
    return (
      <td className='monthly-total-component'>
        <div>
          <i className='fas fa-plus-square left-icon blue' />
          {this.state.incomeTotal}
        </div>
        <div>
          <i className='fas fa-minus-square left-icon red' />
          {this.state.expenditureTotal}
        </div>
      </td>
    )
  }
}

MonthlyTotal.propTypes = {
  tally: PropTypes.array
}

export default MonthlyTotal
