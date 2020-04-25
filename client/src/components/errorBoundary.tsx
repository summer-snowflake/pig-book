import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ResponseErrorsStore } from 'types/store'
import { RootState } from 'reducers/rootReducer'
import { withRouter, RouteComponentProps, Redirect, Route, Switch } from 'react-router-dom'
import SignInPage from './login/signInPage'

interface StateProps {
  responseErrors: ResponseErrorsStore;
}

type Props = StateProps & RouteComponentProps

class ErrorBoundary extends Component<Props> {
  render(): React.ReactNode {
    switch (this.props.responseErrors.status) {
    case undefined:
      if (window.confirm('Network Error! Reload this page.')) {
        this.props.history.go(0)
      }
      break
    case 401:
      return (
        <Switch>
          <Route component={SignInPage} exact path='/users/sign_in' />
          <Redirect push to='/users/sign_in' />
        </Switch>
      )
    }

    return this.props.children
  }
}

function mapState(state: RootState): StateProps {
  return {
    responseErrors: state.responseErrors
  }
}

export default connect(mapState)(withRouter(ErrorBoundary))
