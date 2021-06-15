import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from 'modules/store'
import TopPage from 'components/TopPage'
import SignInPage from 'components/SignInPage'
import MyPage from 'components/MyPage'
import Notification from 'components/common/Notification'
import Header from 'components/Header'
import Footer from 'components/Footer'

export const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Notification />
        <Switch>
          <Route component={TopPage} exact path='/' />
          <Route component={SignInPage} path='/users/sign_in' />
          <Route component={MyPage} path='/mypage' />
        </Switch>
        <Footer />
      </Router>
    </Provider>
  )
}
