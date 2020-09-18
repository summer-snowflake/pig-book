import React, { Component } from 'react'
import MonthlyBarChartLarge from './monthlyBarChartLarge'
import MonthlyBarChartSmall from './monthlyBarChartSmall'

import { MonthlyBalanceTable } from 'types/api'

interface Props {
  monthlyTotal: MonthlyBalanceTable[];
}

class MonthlyBarChart extends Component<Props> {
  render(): JSX.Element {
    return (
      <div className='monthly-bar-chart-component'>
        <MonthlyBarChartLarge monthlyTotal={this.props.monthlyTotal} />
        <MonthlyBarChartSmall monthlyTotal={this.props.monthlyTotal} />
      </div>
    )
  }
}

export default MonthlyBarChart
