import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import { withRouter, RouteComponentProps, Redirect, Route, Switch } from 'react-router-dom'

import { ResponseErrorsStore } from 'types/store'
import { RootState } from 'reducers/rootReducer'
import SignInPage from 'components/login/signInPage'
import FlashMessage from 'components/common/flashMessage'

interface ParentProps {
  children: React.ReactNode
}

interface StateProps {
  responseErrors: ResponseErrorsStore;
}

type Props = ParentProps & StateProps & RouteComponentProps

class ErrorBoundary extends Component<Props> {
  render(): React.ReactNode {
    switch (this.props.responseErrors.status) {
    case undefined:
      toast.error(<FlashMessage actionType={'ACCESS_FAILURE'} />)
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
