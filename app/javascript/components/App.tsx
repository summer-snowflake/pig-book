import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { store } from 'modules/store'
import AlertModal from 'components/common/AlertModal'
import TopPage from 'components/TopPage'
import SignInPage from 'components/SignInPage'
import SignUpPage from 'components/SignUpPage'
import ResendMailPage from 'components/ResendMailPage'
import MyPage from 'components/MyPage'
import CategoryPage from 'components/CategoryPage'
import BreakdownPage from 'components/BreakdownPage'
import Header from 'components/Header'
import Footer from 'components/Footer'
import SettingsTopPage from 'components/SettingsTopPage'
import AdminUsersPage from 'components/AdminUsersPage'
import Page404 from 'components/errors/Page404'

import 'react-toastify/dist/ReactToastify.css'
import 'stylesheets/toastify.sass'

export const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <ToastContainer />
        <AlertModal />
        <Switch>
          <Route component={TopPage} exact path='/' />
          <Route component={SignInPage} exact path='/users/sign_in' />
          <Route component={SignInPage} exact path='/users/confirmed' />
          <Route component={SignUpPage} exact path='/users/sign_up' />
          <Route component={ResendMailPage} exact path='/users/confirmations' />
          <Route component={MyPage} exact path='/mypage' />
          <Route component={CategoryPage} exact path='/categories' />
          <Route component={BreakdownPage} exact path='/breakdowns' />
          <Route component={SettingsTopPage} exact path='/settings' />
          <Route component={AdminUsersPage} exact path='/admin/users' />
          <Route component={Page404} />
        </Switch>
        <Footer />
      </Router>
    </Provider>
  )
}
