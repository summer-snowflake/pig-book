import React, { Component } from 'react'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import { DashboardStore, UserStore, CategoriesStore } from 'types/store'
import { Category } from 'types/api'
import { getDashboard, patchDashboard, clearDashboard } from 'actions/dashboardActions'
import { getCategories } from 'actions/categoriesActions'
import { RootState } from 'reducers/rootReducer'
import HumanYearMonth from 'components/common/humanYearMonth'
import MonthlyData from 'components/dashboard/monthlyData'
import MonthlyBarChart from 'components/dashboard/monthlyBarChart'
import YearlyPieChart from 'components/dashboard/yearlyPieChart'
import TallyField from 'components/dashboard/tallyField'
import CategoryTab from 'components/dashboard/categoryTab'

interface StateProps {
  dashboardStore: DashboardStore;
  userStore: UserStore;
  categoriesStore: CategoriesStore;
}

interface DispatchProps {
  getDashboard: (year: number) => void;
  patchDashboard: (year: number) => void;
  clearDashboard: () => void;
  getCategories: () => void;
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

    this.props.getCategories()
  }

  handleClickTallyButton(): void {
    this.props.patchDashboard(this.props.dashboardStore.year)
  }

  handleClickLeftArrow(): void {
    const targetYear = this.props.dashboardStore.year - 1
    this.props.getDashboard(targetYear)
    this.props.history.push('/dashboards/' + targetYear)
  }

  handleClickRightArrow(): void {
    const targetYear = this.props.dashboardStore.year + 1
    this.props.getDashboard(targetYear)
    this.props.history.push('/dashboards/' + targetYear)
  }

  handleClickCategory(category: Category): void {
    this.setState({
      activeCategoryId: category.id
    })
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
          <div className='dashboards-link text-right'>
            <Link to='/dashboards'>
              {t('link.dashboards')}
            </Link>
          </div>
        </div>
        <ul className='nav nav-tabs'>
          {this.props.categoriesStore.categories.map((category) => (
            <CategoryTab
              activeCategoryId={this.state.activeCategoryId}
              category={category} key={category.id}
              onClickCategory={this.handleClickCategory}
            />
          ))}
        </ul>
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    dashboardStore: state.dashboard,
    userStore: state.user,
    categoriesStore: state.categories
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
    getCategories(): void {
      dispatch(getCategories())
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(withRouter(DashboardContainer)))
