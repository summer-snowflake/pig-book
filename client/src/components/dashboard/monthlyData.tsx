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
  render(): JSX.Element {
    return (
      <div className='monthly-data-component'>
        <table className='table'>
          <tbody>
            {Array.from(new Array(12)).map((_v,i)=> i + 1).map((month) => (
              <tr key={month}>
                <td>
                  <HumanYearMonth month={month} />
                  <span className='float-right list-icon'>
                    <Link to={'/list?year=' + this.props.year + '&month=' + month + '&order=published_at'}>
                      <i className='fas fa-align-justify left-icon' />
                    </Link>
                  </span>
                </td>
                <TallyTableData key={month} tally={this.props.monthlyTotal.find((d) => d.month === month)} />
              </tr>
            ))}
            <YearlyData yearly={this.props.yearlyTotal} />
          </tbody>
        </table>
      </div>
    )
  }
}

export default MonthlyData
