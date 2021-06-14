import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from 'modules/store'
import TopPage from 'components/TopPage'
import SignInPage from 'components/SignInPage'
import Header from 'components/Header'
import Footer from 'components/Footer'

export const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Switch>
          <Route component={TopPage} exact path='/' />
          <Route component={SignInPage} path='/users/sign_in' />
        </Switch>
        <Footer />
      </Router>
    </Provider>
  )
}
