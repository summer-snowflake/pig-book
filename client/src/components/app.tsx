import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { connect } from 'react-redux'
import i18next from 'i18next'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import { ProfileStore } from 'types/store'
import { RootState } from 'reducers/rootReducer'
import Header from 'components/headerContainer'
import TopPage from 'components/top/topPage'
import InputPage from 'components/input/inputPage'
import ListPage from 'components/list/listPage'
import DashboardPage from 'components/dashboard/dashboardPage'
import DashboardsPage from 'components/dashboard/dashboardsPage'
import SignInPage from 'components/login/signInPage'
import SignUpPage from 'components/login/signUpPage'
import MypageTopPage from 'components/mypage/mypageTopPage'
import SettingsTopPage from 'components/settings/settingsTopPage'
import CategoryPage from 'components/settings/category/categoryPage'
import BreakdownPage from 'components/settings/breakdown/breakdownPage'
import PlacePage from 'components/settings/place/placePage'
import AdminUsersPage from 'components/admin/adminUsersPage'
import Footer from 'components/footer'
import Page404 from 'components/errors/page404'
import ErrorBoundary from 'components/errorBoundary'

import 'react-toastify/dist/ReactToastify.css'
import 'stylesheets/toastify.sass'

library.add(fab, fas, far)

interface StateProps {
  profile: ProfileStore;
}

type Props = StateProps

class App extends Component<Props> {
  render(): JSX.Element {
    i18next.changeLanguage(this.props.profile.locale)

    return (
      <div className='app-component'>
        <Router>
          <ToastContainer />
          <Header />
          <ErrorBoundary>
            <Switch>
              <Route component={TopPage} exact path='/' />
              <Route component={SignInPage} exact path='/users/sign_in' />
              <Route component={SignInPage} exact path='/api/auth/confirmation' />
              <Route component={SignUpPage} exact path='/users/sign_up' />
              <Route component={InputPage} exact path='/input' />
              <Route component={ListPage} exact path='/list' />
              <Route component={DashboardPage} exact path='/dashboard' />
              <Route component={DashboardsPage} exact path='/dashboards' />
              <Route component={MypageTopPage} exact path='/mypage' />
              <Route component={SettingsTopPage} exact path='/settings' />
              <Route component={CategoryPage} exact path='/categories' />
              <Route component={BreakdownPage} exact path='/breakdowns' />
              <Route component={PlacePage} exact path='/places' />
              <Route component={AdminUsersPage} exact path='/admin/users' />
              <Route component={Page404} exact />
            </Switch>
          </ErrorBoundary>
          <Footer />
        </Router>
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    profile: state.profile
  }
}

export default connect(mapState)(App)

