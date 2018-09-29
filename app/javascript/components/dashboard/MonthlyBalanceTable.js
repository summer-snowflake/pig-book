import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import moment from 'moment'
import reactMixin from 'react-mixin'

import MonthName from './../common/MonthName'
import MonthlyTotalIncome from './MonthlyTotalIncome'
import MonthlyTotalExpenditure from './MonthlyTotalExpenditure'
import MonthlyTotal from './MonthlyTotal'
import LocalStorageMixin from './../mixins/LocalStorageMixin'

class MonthlyBalanceTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lastRequestAt: this.getLastRequestAt(),
      userToken: this.getUserToken(),
      monthlyBalanceTable: this.props.monthlyBalanceTable,
      year: this.props.year || moment().year()
    }
  }

  componentWillMount() {
    this.getMonthlyBalanceTables()
  }

  getMonthlyBalanceTables() {
    let options = {
      method: 'GET',
      url: origin + '/api/monthly_balance_tables/' + this.state.year,
      params: {
        last_request_at: this.state.lastRequestAt
      },
      headers: {
        'Authorization': 'Token token=' + this.state.userToken
      },
      json: true
    }
    axios(options)
      .then((res) => {
        this.setState({
          monthlyBalanceTable: res.data
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
              <td className='monthly-td'>{'合計'}</td>
            </tr>
            <tr>
              {monthlyKeys.map((index) =>
                (<td key={index}>
                  <MonthlyTotalIncome month={index + 1} tally={this.state.monthlyBalanceTable} />
                  <MonthlyTotalExpenditure month={index + 1} tally={this.state.monthlyBalanceTable} />
                </td>)
              )}
              <MonthlyTotal tally={this.state.monthlyBalanceTable} />
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

MonthlyBalanceTable.propTypes = {
  monthlyBalanceTable: PropTypes.array,
  year: PropTypes.number
}

reactMixin.onClass(MonthlyBalanceTable, LocalStorageMixin)

export default MonthlyBalanceTable
