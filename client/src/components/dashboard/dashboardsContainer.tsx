import React, { Component } from 'react'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { DashboardsStore } from 'types/store'
import { patchDashboard } from 'actions/dashboardActions'
import { getDashboards, clearDashboards } from 'actions/dashboardsActions'
import { RootState } from 'reducers/rootReducer'
import HumanYearMonth from 'components/common/humanYearMonth'
import MonthlyBarChart from 'components/dashboard/monthlyBarChart'
import TallyField from './tallyField'
import YearlyPieChart from 'components/dashboard/yearlyPieChart'
import OtherTallyField from 'components/dashboard/otherTallyField'

interface StateProps {
  dashboardsStore: DashboardsStore;
}

interface DispatchProps {
  getDashboards: () => void;
  patchDashboard: (year: number) => void;
  clearDashboards: () => void;
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
    const dashboards = this.props.dashboardsStore.dashboards
    return (
      <div className='dashboards-component'>
        <OtherTallyField
          disabled={this.props.dashboardsStore.isLoading}
          onClickTallyButton={this.handleClickTallyButton}
        />
        {Object.keys(dashboards).reverse().map((year) => (
          <div className='dashboard' key={year}>
            <div className='dashboard-year'>
              <Link to={'/dashboards/' + year}>
                <HumanYearMonth year={year} />
              </Link>
            </div>
            <div className='row'>
              <TallyField dashboard={dashboards[Number(year)]} disabled={this.props.dashboardsStore.isLoading} onClickTallyButton={this.handleClickTallyButton} />
            </div>
            <div className='row'>
              <MonthlyBarChart monthlyTotal={dashboards[Number(year)].monthly_total} />
              <div className='row'>
                <YearlyPieChart
                  breakdownYearly={dashboards[Number(year)].yearly_breakdown_income}
                  categoryYearly={dashboards[Number(year)].yearly_category_income}
                  dataKey={'income'}
                  onUnmount={this.props.clearDashboards}
                />
                <YearlyPieChart
                  breakdownYearly={dashboards[Number(year)].yearly_breakdown_expenditure}
                  categoryYearly={dashboards[Number(year)].yearly_category_expenditure}
                  dataKey={'expenditure'}
                  onUnmount={this.props.clearDashboards}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    dashboardsStore: state.dashboards
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
    clearDashboards(): void {
      dispatch(clearDashboards())
    }
  }
}

export default connect(mapState, mapDispatch)(DashboardContainer)
