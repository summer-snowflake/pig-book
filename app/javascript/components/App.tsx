import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import TopPage from 'components/TopPage'

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={TopPage} exact path='/' />
      </Switch>
    </Router>
  )
}
