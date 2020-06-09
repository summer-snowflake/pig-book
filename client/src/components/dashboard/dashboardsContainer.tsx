import React, { Component } from 'react'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'
import { connect } from 'react-redux'

import { DashboardsStore } from 'types/store'
import { patchDashboard, clearDashboard } from 'actions/dashboardActions'
import { getDashboards } from 'actions/dashboardsActions'
import { RootState } from 'reducers/rootReducer'
import HumanYearMonth from 'components/common/humanYearMonth'
import MonthlyData from 'components/dashboard/monthlyData'
import MonthlyBarChart from 'components/dashboard/monthlyBarChart'
import TallyField from './tallyField'
import YearlyPieChart from 'components/dashboard/yearlyPieChart'

interface StateProps {
  dashboards: DashboardsStore;
}

interface DispatchProps {
  getDashboards: () => void;
  patchDashboard: (year: number) => void;
  clearDashboard: () => void;
}

type Props = StateProps & DispatchProps

class DashboardContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.props.getDashboards()

    this.handleClickTallyButton = this.handleClickTallyButton.bind(this)
    this.handleUnmount = this.handleUnmount.bind(this)
  }

  handleClickTallyButton(year: number): void {
    this.props.patchDashboard(year)
  }

  handleUnmount(): void {
    console.log('AAA')
  }

  render(): JSX.Element {
    const dashboards = this.props.dashboards.dashboards
    return (
      <div className='dashboards-component'>
        {Object.keys(dashboards).map((year) => (
          <div className='dashboard' key={year}>
            <div className='dashboard-year'>
              <HumanYearMonth year={year} />
            </div>
            <TallyField dashboard={dashboards[Number(year)]} disabled={this.props.dashboards.isLoading} onClickTallyButton={this.handleClickTallyButton} />
            <MonthlyData monthly={dashboards[Number(year)].monthly} year={Number(year)} yearly={dashboards[Number(year)].yearly} />
            <div className='chart-line'>
              <MonthlyBarChart monthly={dashboards[Number(year)].monthly} />
              <YearlyPieChart
                breakdownYearly={dashboards[Number(year)].yearly_breakdown_income}
                categoryYearly={dashboards[Number(year)].yearly_category_income}
                dataKey={'income'}
                handleUnmount={this.handleUnmount}
              />
              <YearlyPieChart
                breakdownYearly={dashboards[Number(year)].yearly_breakdown_expenditure}
                categoryYearly={dashboards[Number(year)].yearly_category_expenditure}
                dataKey={'expenditure'}
                handleUnmount={this.handleUnmount}
              />
            </div>
          </div>
        ))}
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    dashboards: state.dashboards
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    getDashboards(): void {
      dispatch(getDashboards())
    },
    patchDashboard(year: number): void {
      dispatch(patchDashboard(year)).then(() => {
        dispatch(getDashboards())
      })
    },
    clearDashboard(): void {
      dispatch(clearDashboard())
    }
  }
}

export default connect(mapState, mapDispatch)(DashboardContainer)
