import React, { Component } from 'react'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'
import { connect } from 'react-redux'

import { DashboardStore } from 'types/store'
import { getDashboard, patchDashboard } from 'actions/dashboardActions'
import { RootState } from 'reducers/rootReducer'
import HumanYearMonth from 'components/common/humanYearMonth'
import MonthlyData from 'components/dashboard/monthlyData'
import MonthlyBarChart from 'components/dashboard/monthlyBarChart'
import TallyField from './tallyField'

interface StateProps {
  dashboard: DashboardStore;
}

interface DispatchProps {
  getDashboard: () => void;
  patchDashboard: (year: number) => void;
}

type Props = StateProps & DispatchProps

class DashboardContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.props.getDashboard()

    this.handleClickTallyButton = this.handleClickTallyButton.bind(this)
  }

  handleClickTallyButton(): void {
    this.props.patchDashboard(this.props.dashboard.year)
  }

  render(): JSX.Element {
    return (
      <div className='dashboard-component'>
        <div className='dashboard-year'>
          <HumanYearMonth year={this.props.dashboard.year} />
        </div>
        <TallyField dashboard={this.props.dashboard} disabled={this.props.dashboard.isLoading} onClickTallyButton={this.handleClickTallyButton} />
        <MonthlyData monthly={this.props.dashboard.monthly} year={this.props.dashboard.year} yearly={this.props.dashboard.yearly} />
        <MonthlyBarChart monthly={this.props.dashboard.monthly} />
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    dashboard: state.dashboard
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    getDashboard(): void {
      dispatch(getDashboard())
    },
    patchDashboard(year: number): void {
      dispatch(patchDashboard(year)).then(() => {
        dispatch(getDashboard())
      })
    }
  }
}

export default connect(mapState, mapDispatch)(DashboardContainer)
