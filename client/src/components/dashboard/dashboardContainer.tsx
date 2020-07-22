import React, { Component } from 'react'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import { DashboardStore, UserStore, DashboardCategoryStore } from 'types/store'
import { Category } from 'types/api'
import { getDashboard, patchDashboard, clearDashboard, getDashboardCategory } from 'actions/dashboardActions'
import { getCategory } from 'actions/categoryActions'
import { RootState } from 'reducers/rootReducer'
import HumanYearMonth from 'components/common/humanYearMonth'
import MonthlyData from 'components/dashboard/monthlyData'
import MonthlyBarChart from 'components/dashboard/monthlyBarChart'
import YearlyPieChart from 'components/dashboard/yearlyPieChart'
import TallyField from 'components/dashboard/tallyField'
import CategoryTab from 'components/dashboard/categoryTab'
import CategoryDashboardContainer from 'components/dashboard/categoryDashboardContainer'

interface StateProps {
  dashboardStore: DashboardStore;
  dashboardCategoryStore: DashboardCategoryStore;
  userStore: UserStore;
}

interface DispatchProps {
  getDashboard: (year: number) => void;
  patchDashboard: (year: number) => void;
  clearDashboard: () => void;
  getDashboardCategory: (year: number, categoryId: number) => void;
}

type Props = I18nProps & RouteComponentProps & StateProps & DispatchProps

interface State {
  activeCategoryId: number | null;
}

class DashboardContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      activeCategoryId: null
    }

    this.props.getDashboard((new Date()).getFullYear())

    this.handleClickTallyButton = this.handleClickTallyButton.bind(this)
    this.handleClickLeftArrow = this.handleClickLeftArrow.bind(this)
    this.handleClickRightArrow = this.handleClickRightArrow.bind(this)
    this.handleClickCategory = this.handleClickCategory.bind(this)
  }

  handleClickTallyButton(): void {
    this.props.patchDashboard(this.props.dashboardStore.year)
  }

  handleClickLeftArrow(): void {
    const targetYear = this.props.dashboardStore.year - 1
    this.props.getDashboard(targetYear)
    this.props.history.push('/dashboards/' + targetYear)
    this.setState({
      activeCategoryId: null
    })
  }

  handleClickRightArrow(): void {
    const targetYear = this.props.dashboardStore.year + 1
    this.props.getDashboard(targetYear)
    this.props.history.push('/dashboards/' + targetYear)
    this.setState({
      activeCategoryId: null
    })
  }

  handleClickCategory(category: Category): void {
    this.setState({
      activeCategoryId: category.id
    })
    this.props.getDashboardCategory(this.props.dashboardStore.year, category.id)
  }

  render(): JSX.Element {
    const { t } = this.props
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
        <MonthlyData monthlyTotal={this.props.dashboardStore.monthly_total} year={this.props.dashboardStore.year} yearlyTotal={this.props.dashboardStore.yearly_total} />
        <div className='chart-line'>
          <MonthlyBarChart monthlyTotal={this.props.dashboardStore.monthly_total} />
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
          <div className='dashboards-link text-right'>
            <Link to='/dashboards'>
              {t('link.dashboards')}
            </Link>
          </div>
        </div>
        <ul className='nav nav-tabs'>
          {this.props.dashboardStore.categories.map((category) => (
            <CategoryTab
              activeCategoryId={this.state.activeCategoryId}
              category={category} key={category.id}
              onClickCategory={this.handleClickCategory}
            />
          ))}
        </ul>
        <CategoryDashboardContainer
          category={this.props.dashboardCategoryStore.category}
          monthlyTotal={this.props.dashboardCategoryStore.monthlyBreakdowns}
        />
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    dashboardStore: state.dashboard,
    dashboardCategoryStore: state.dashboardCategory,
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
    },
    getDashboardCategory(year: number, categoryId: number): void {
      dispatch(getDashboardCategory(year, categoryId)).then(() => {
        dispatch(getCategory(categoryId))
      })
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(withRouter(DashboardContainer)))
