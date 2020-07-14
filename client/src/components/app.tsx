import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Action } from 'redux'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import { ProfileStore, UserStore } from 'types/store'
import { getProfile } from 'actions/settingsActions'
import { getUser } from 'actions/userActions'
import { signOut } from 'actions/sessionActions'
import { RootState } from 'reducers/rootReducer'
import Header from 'components/header'
import TopPage from 'components/top/topPage'
import InputPage from 'components/input/inputPage'
import ListPage from 'components/list/listPage'
import DashboardPage from 'components/dashboard/dashboardPage'
import DashboardsPage from 'components/dashboard/dashboardsPage'
import DailyPage from 'components/daily/dailyPage'
import SignInPage from 'components/login/signInPage'
import SignUpPage from 'components/login/signUpPage'
import MypageTopPage from 'components/mypage/mypageTopPage'
import SettingsTopPage from 'components/settings/user/settingsTopPage'
import CategoryPage from 'components/settings/category/categoryPage'
import BreakdownPage from 'components/settings/breakdown/breakdownPage'
import PlacePage from 'components/settings/place/placePage'
import TagPage from 'components/settings/tag/tagPage'
import AdminUsersPage from 'components/admin/adminUsersPage'
import Footer from 'components/footer'
import Page404 from 'components/errors/page404'
import ErrorBoundary from 'components/errorBoundary'

import 'react-toastify/dist/ReactToastify.css'
import 'stylesheets/toastify.sass'
import 'stylesheets/react_tooltip.sass'

library.add(fab, fas, far)

interface StateProps {
  profile: ProfileStore;
  userStore: UserStore;
}

interface DispatchProps {
  getProfile: () => void;
  getUser: () => void;
  signOut: () => void;
}

type Props = StateProps & DispatchProps

class App extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleSignOut = this.handleSignOut.bind(this)

    this.props.getProfile()
    this.props.getUser()
  }

  handleSignOut() {
    this.props.signOut()
  }

  render(): JSX.Element {
    return (
      <div className='app-component'>
        <Router>
          <Header user={this.props.userStore} handleClickSignOutLink={this.handleSignOut} />
          <ToastContainer />
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
              <Route component={DailyPage} exact path='/daily' />
              <Route component={MypageTopPage} exact path='/mypage' />
              <Route component={SettingsTopPage} exact path='/settings' />
              <Route component={CategoryPage} exact path='/categories' />
              <Route component={BreakdownPage} exact path='/breakdowns' />
              <Route component={PlacePage} exact path='/places' />
              <Route component={TagPage} exact path='/labels' />
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
    profile: state.profile,
    userStore: state.user
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    getProfile(): void {
      dispatch(getProfile())
    },
    getUser(): void {
      dispatch(getUser())
    },
    signOut(): void {
      dispatch(signOut())
    }
  }
}

export default connect(mapState, mapDispatch)(App)
