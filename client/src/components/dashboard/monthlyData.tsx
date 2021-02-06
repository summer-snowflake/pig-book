import React, { Component } from 'react'

import { MonthlyBalanceTable, YearlyBalanceTable } from 'types/api'
import HumanYearMonth from 'components/common/humanYearMonth'
import TallyTableData from './tallyTableData'
import { Link } from 'react-router-dom'
import YearlyData from 'components/dashboard/yearlyData'

interface Props {
  year: number;
  monthlyTotal: MonthlyBalanceTable[];
  yearlyTotal: YearlyBalanceTable | undefined;
}

class MonthlyData extends Component<Props> {
  isCashlessRange(year: number, month: number): boolean {
    const publishedTime = new Date(year, month - 1, 1, 0, 0, 0).getTime()
    const startTime = new Date(2019, 9, 1, 0, 0, 0).getTime() // 2019/10/01
    const endTime = new Date(2020, 5, 30, 23, 59, 59).getTime() // 2020/06/30
    return (publishedTime >= startTime && publishedTime <= endTime)
  }

  render(): JSX.Element {
    return (
      <div className='monthly-data-component col'>
        <table className='table'>
          <tbody>
            {Array.from(new Array(12)).map((_v,i)=> i + 1).map((month) => (
              <tr key={month}>
                <td>
                  <HumanYearMonth month={month} />
                  <span className='float-right list-icon'>
                    <Link to={'/list?year=' + this.props.year + '&month=' + month + '&order=published_at'}>
                      <i className='fas fa-sitemap left-icon' />
                    </Link>
                  </span>
                </td>
                <TallyTableData isCashlessRange={this.isCashlessRange(this.props.year, month)} key={month} tally={this.props.monthlyTotal.find((d) => d.month === month)} />
              </tr>
            ))}
            <YearlyData year={this.props.year} yearly={this.props.yearlyTotal} />
          </tbody>
        </table>
      </div>
    )
  }
}

export default MonthlyData
