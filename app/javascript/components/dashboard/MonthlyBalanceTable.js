import React from 'react'
import PropTypes from 'prop-types'

import MonthName from './../common/MonthName'
import MonthlyTotalIncome from './MonthlyTotalIncome'
import MonthlyTotalExpenditure from './MonthlyTotalExpenditure'

class MonthlyBalanceTable extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let monthlyKeys = [...Array(12).keys()]

    return (
      <div className='monthly-balance-table-component'>
        <table className='table table-bordered monthly-table'>
          <tbody>
            <tr>
              {monthlyKeys.map((index) =>
                (<td className='monthly-td' key={index}>
                  <MonthName month={index + 1} />
                </td>)
              )}
            </tr>
            <tr>
              {monthlyKeys.map((index) =>
                (<td key={index}>
                  <MonthlyTotalIncome month={index + 1} tally={this.props.data} />
                  <MonthlyTotalExpenditure month={index + 1} tally={this.props.data} />
                </td>)
              )}
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

MonthlyBalanceTable.propTypes = {
  data: PropTypes.array.isRequired
}

export default MonthlyBalanceTable
