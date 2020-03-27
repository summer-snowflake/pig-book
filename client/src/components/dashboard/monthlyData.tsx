import React, { Component } from 'react'

import { MonthlyBalanceTable } from 'types/api'
import HumanYearMonth from 'components/common/humanYearMonth'
import MonthlyTableData from './monthlyTableData'
import { Link } from 'react-router-dom'

interface Props {
  year: number;
  monthly: MonthlyBalanceTable[];
  currency: string;
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
                <MonthlyTableData currency={this.props.currency} key={month} monthly={this.props.monthly.find((d) => d.month === month)} />
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
                <MonthlyTableData currency={this.props.currency} key={month} monthly={this.props.monthly.find((d) => d.month === month)} />
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default MonthlyData
