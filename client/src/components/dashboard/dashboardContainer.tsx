import React, { Component } from 'react'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'
import { connect } from 'react-redux'

import { DashboardStore, UserStore } from 'types/store'
import { getDashboard, patchDashboard, clearDashboard } from 'actions/dashboardActions'
import { RootState } from 'reducers/rootReducer'
import HumanYearMonth from 'components/common/humanYearMonth'
import MonthlyData from 'components/dashboard/monthlyData'
import MonthlyBarChart from 'components/dashboard/monthlyBarChart'
import YearlyPieChart from 'components/dashboard/yearlyPieChart'
import TallyField from 'components/dashboard/tallyField'

interface StateProps {
  dashboardStore: DashboardStore;
  userStore: UserStore;
}

interface DispatchProps {
  getDashboard: (year: number) => void;
  patchDashboard: (year: number) => void;
  clearDashboard: () => void;
}

type Props = StateProps & DispatchProps

class DashboardContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.props.getDashboard((new Date()).getFullYear())

    this.handleClickTallyButton = this.handleClickTallyButton.bind(this)
    this.handleClickLeftArrow = this.handleClickLeftArrow.bind(this)
    this.handleClickRightArrow = this.handleClickRightArrow.bind(this)
  }

  handleClickTallyButton(): void {
    this.props.patchDashboard(this.props.dashboardStore.year)
  }

  handleClickLeftArrow(): void {
    this.props.getDashboard(this.props.dashboardStore.year - 1)
  }

  handleClickRightArrow(): void {
    this.props.getDashboard(this.props.dashboardStore.year + 1)
  }

  render(): JSX.Element {
    const prevDashboardDisabled = !this.props.userStore.dashboardYears.includes(this.props.dashboardStore.year - 1)
    const nextDashboardDisabled = !this.props.userStore.dashboardYears.includes(this.props.dashboardStore.year + 1)

    return (
      <div className='dashboard-component'>
        <div className='dashboard-year'>
          <button className='btn btn-secondary btn-sm' disabled={prevDashboardDisabled} onClick={this.handleClickLeftArrow}>
            <i className='fas fa-chevron-left' />
          </button>
          <HumanYearMonth year={this.props.dashboardStore.year} />
          <button className='btn btn-secondary btn-sm' disabled={nextDashboardDisabled} onClick={this.handleClickRightArrow}>
            <i className='fas fa-chevron-right' />
          </button>
       </div>
        <TallyField dashboard={this.props.dashboardStore} disabled={this.props.dashboardStore.isLoading} onClickTallyButton={this.handleClickTallyButton} />
        <MonthlyData monthly={this.props.dashboardStore.monthly} year={this.props.dashboardStore.year} yearly={this.props.dashboardStore.yearly} />
        <div className='chart-line'>
          <MonthlyBarChart monthly={this.props.dashboardStore.monthly} />
          <YearlyPieChart
            breakdownYearly={this.props.dashboardStore.yearly_breakdown_income}
            categoryYearly={this.props.dashboardStore.yearly_category_income}
            dataKey={'income'}
            onUnmount={this.props.clearDashboard}
          />
          <YearlyPieChart
            breakdownYearly={this.props.dashboardStore.yearly_breakdown_expenditure}
            categoryYearly={this.props.dashboardStore.yearly_category_expenditure}
            dataKey={'expenditure'}
            onUnmount={this.props.clearDashboard}
          />
        </div>
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    dashboardStore: state.dashboard,
    userStore: state.user
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    getDashboard(year: number): void {
      dispatch(getDashboard(year))
    },
    patchDashboard(year: number): void {
      dispatch(patchDashboard(year)).then(() => {
        dispatch(getDashboard(year))
      })
    },
    clearDashboard(): void {
      dispatch(clearDashboard())
    }
  }
}

export default connect(mapState, mapDispatch)(DashboardContainer)
