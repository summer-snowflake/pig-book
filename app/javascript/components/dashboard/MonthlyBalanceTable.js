import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import reactMixin from 'react-mixin'

import MonthName from './../common/MonthName'
import MonthlyTotalIncome from './MonthlyTotalIncome'
import MonthlyTotalExpenditure from './MonthlyTotalExpenditure'
import MonthlyTotal from './MonthlyTotal'
import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import { monthlyBalanceTablesAxios } from './../mixins/requests/DashboardMixin'

class MonthlyBalanceTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      monthlyBalanceTable: this.props.monthlyBalanceTable,
      year: this.props.year || moment().year()
    }
    this.getMonthlyBalanceTables = this.getMonthlyBalanceTables.bind(this)
    this.getMonthlyBalanceTablesCallback = this.getMonthlyBalanceTablesCallback.bind(this)
    this.noticeErrorMessage = this.noticeErrorMessage.bind(this)
  }

  componentWillMount() {
    this.getMonthlyBalanceTables()
  }

  noticeErrorMessage(error) {
    this.noticeErrorMessages(error)
  }

  getMonthlyBalanceTablesCallback(res) {
    this.setState({
      monthlyBalanceTable: res.data
    })
  }

  getMonthlyBalanceTables() {
    monthlyBalanceTablesAxios.get(this.state.year, this.getMonthlyBalanceTablesCallback, this.noticeErrorMessage)
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
                  <a href={'/records?year=' + this.state.year + '&month=' + (index + 1)}>
                    <MonthName month={index + 1} />
                  </a>
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

reactMixin.onClass(MonthlyBalanceTable, MessageNotifierMixin)

export default MonthlyBalanceTable
