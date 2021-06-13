import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import HeaderMenu from 'components/HeaderMenu'
import TopPage from 'components/TopPage'

export const App = () => {
  return (
    <Router>
      <HeaderMenu />
      <Switch>
        <Route component={TopPage} exact path='/' />
      </Switch>
    </Router>
  )
}