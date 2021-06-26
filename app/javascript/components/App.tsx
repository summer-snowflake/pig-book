import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { store } from 'modules/store'
import TopPage from 'components/TopPage'
import SignInPage from 'components/SignInPage'
import SignUpPage from 'components/SignUpPage'
import MyPage from 'components/MyPage'
import Header from 'components/Header'
import Footer from 'components/Footer'

import 'react-toastify/dist/ReactToastify.css'
import 'stylesheets/toastify.sass'

export const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <ToastContainer />
        <Switch>
          <Route component={TopPage} exact path='/' />
          <Route component={SignInPage} exact path='/users/sign_in' />
          <Route component={SignInPage} exact path='/confirmed' />
          <Route component={SignUpPage} exact path='/users/sign_up' />
          <Route component={MyPage} exact path='/mypage' />
        </Switch>
        <Footer />
      </Router>
    </Provider>
  )
}
