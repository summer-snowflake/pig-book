import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from 'modules/store'
import TopPage from 'components/TopPage'
import Header from 'components/Header'
import Footer from 'components/Footer'

export const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Switch>
          <Route component={TopPage} exact path='/' />
        </Switch>
        <Footer />
      </Router>
    </Provider>
  )
}
