import React, { Component } from 'react'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'
import { connect } from 'react-redux'

import { DashboardsStore } from 'types/store'
import { patchDashboard } from 'actions/dashboardActions'
import { getDashboards } from 'actions/dashboardsActions'
import { RootState } from 'reducers/rootReducer'
import HumanYearMonth from 'components/common/humanYearMonth'
import MonthlyData from 'components/dashboard/monthlyData'
import MonthlyBarChart from 'components/dashboard/monthlyBarChart'
import TallyField from './tallyField'

interface StateProps {
  dashboards: DashboardsStore;
}

interface DispatchProps {
  getDashboards: () => void;
  patchDashboard: (year: number) => void;
}

type Props = StateProps & DispatchProps

class DashboardContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.props.getDashboards()

    this.handleClickTallyButton = this.handleClickTallyButton.bind(this)
  }

  handleClickTallyButton(year: number): void {
    this.props.patchDashboard(year)
  }

  render(): JSX.Element {
    const dashboards = this.props.dashboards.dashboards
    return (
      <div className='dashboards-component'>
        {Object.keys(dashboards).map((year) => (
          <div key={year}>
            <div className='dashboard-year'>
              <HumanYearMonth year={year} />
            </div>
            <TallyField dashboard={dashboards[Number(year)]} disabled={this.props.dashboards.isLoading} onClickTallyButton={this.handleClickTallyButton} />
            <MonthlyData monthly={dashboards[Number(year)].monthly} year={Number(year)} yearly={dashboards[Number(year)].yearly} />
            <MonthlyBarChart monthly={dashboards[Number(year)].monthly} />
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
    }
  }
}

export default connect(mapState, mapDispatch)(DashboardContainer)
