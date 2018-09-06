import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import moment from 'moment'

import MonthName from './../common/MonthName'
import MonthlyTotalIncome from './MonthlyTotalIncome'
import MonthlyTotalExpenditure from './MonthlyTotalExpenditure'

class MonthlyBalanceTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      monthly_balance_tables: this.props.data,
      year: moment().year()
    }
  }

  componentWillMount() {
    this.getMonthlyBalanceTables()
  }

  getMonthlyBalanceTables() {
    let options = {
      method: 'GET',
      url: origin + '/api/monthly_balance_tables',
      params: {
        last_request_at: this.props.last_request_at
      },
      headers: {
        'Authorization': 'Token token=' + this.props.user_token
      },
      json: true
    }
    axios(options)
      .then((res) => {
        this.setState({
          monthly_balance_tables: res.data
        })
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
      })
  }

  render() {
    let monthlyKeys = [...Array(12).keys()]

    return (
      <div className='monthly-balance-table-component'>
        <div className='monthly-balance-table-title'>
          <span>{this.state.year} {'年'}</span>
        </div>
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
                  <MonthlyTotalIncome month={index + 1} tally={this.state.monthly_balance_tables} />
                  <MonthlyTotalExpenditure month={index + 1} tally={this.state.monthly_balance_tables} />
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
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired
}

export default MonthlyBalanceTable
