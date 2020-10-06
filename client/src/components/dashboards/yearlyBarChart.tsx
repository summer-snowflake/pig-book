import React, { Component } from 'react'

import YearlyBarChartLarge from 'components/dashboards/yearlyBarChartLarge'
import YearlyBarChartSmall from 'components/dashboards/yearlyBarChartSmall'
import { DashboardStore } from 'types/store'

interface Props {
  dashboards: DashboardStore[];
}

class YearlyBarChart extends Component<Props> {
  render(): JSX.Element {
    const dashboards = Object.values(this.props.dashboards)

    return (
      <div className='yearly-bar-chart-component'>
        <YearlyBarChartLarge dashboards={dashboards} />
        <YearlyBarChartSmall dashboards={dashboards} />
      </div>
    )
  }
}

export default YearlyBarChart
