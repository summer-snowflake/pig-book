import React, { Component } from 'react'

import { MonthlyBalanceTable } from 'types/api'
import HumanYearMonth from 'components/common/humanYearMonth'
import MonthlyTableData from './monthlyTableData'

interface Props {
  monthly: MonthlyBalanceTable[];
}

class MonthlyData extends Component<Props> {
  render(): JSX.Element {
    return (
      <div className='monthly-data-component'>
        <table className='table'>
          <tbody>
            <tr>
              {Array.from(new Array(6)).map((_v,i)=> i + 1).map((month) => (
                <td key={month}><HumanYearMonth month={month} /></td>
              ))}
            </tr>
            <tr>
              {Array.from(new Array(6)).map((_v,i)=> i + 1).map((month) => (
                <MonthlyTableData key={month} monthly={this.props.monthly.find((d) => d.month === month)} />
              ))}
            </tr>
          </tbody>
        </table>
        <table className='table'>
          <tbody>
            <tr>
              {Array.from(new Array(6)).map((_v,i)=> i + 7).map((month) => (
                <td key={month}><HumanYearMonth month={month} /></td>
              ))}
            </tr>
            <tr>
              {Array.from(new Array(6)).map((_v,i)=> i + 7).map((month) => (
                <MonthlyTableData key={month} monthly={this.props.monthly.find((d) => d.month === month)} />
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default MonthlyData
