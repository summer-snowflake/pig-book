import React, { Component } from 'react'

import { MonthlyBalanceTable, YearlyBalanceTable } from 'types/api'
import HumanYearMonth from 'components/common/humanYearMonth'
import TallyTableData from './tallyTableData'
import { Link } from 'react-router-dom'
import YearlyData from 'components/dashboard/yearlyData'

interface Props {
  year: number;
  monthlyTotal: MonthlyBalanceTable[];
  yearlyTotal: YearlyBalanceTable;
}

class MonthlyData extends Component<Props> {
  render(): JSX.Element {
    return (
      <div className='monthly-data-component'>
        <table className='table'>
          <tbody>
            <tr>
              {Array.from(new Array(6)).map((_v,i)=> i + 1).map((month) => (
                <td key={month}>
                  <HumanYearMonth month={month} />
                  <span className='float-right list-icon'>
                    <Link to={'/list?year=' + this.props.year + '&month=' + month + '&order=published_at'}>
                      <i className='fas fa-align-justify left-icon' />
                    </Link>
                  </span>
                </td>
              ))}
            </tr>
            <tr>
              {Array.from(new Array(6)).map((_v,i)=> i + 1).map((month) => (
                <TallyTableData key={month} tally={this.props.monthlyTotal.find((d) => d.month === month)} />
              ))}
            </tr>
          </tbody>
        </table>
        <table className='table'>
          <tbody>
            <tr>
              {Array.from(new Array(6)).map((_v,i)=> i + 7).map((month) => (
                <td key={month}>
                  <HumanYearMonth month={month} />
                  <span className='float-right list-icon'>
                    <Link to={'/list?year=' + this.props.year + '&month=' + month + '&order=published_at'}>
                      <i className='fas fa-align-justify left-icon' />
                    </Link>
                  </span>
                </td>
              ))}
            </tr>
            <tr>
              {Array.from(new Array(6)).map((_v,i)=> i + 7).map((month) => (
                <TallyTableData key={month} tally={this.props.monthlyTotal.find((d) => d.month === month)} />
              ))}
            </tr>
          </tbody>
        </table>
        <table className='table'>
          <YearlyData yearly={this.props.yearlyTotal} />
        </table>
      </div>
    )
  }
}

export default MonthlyData
