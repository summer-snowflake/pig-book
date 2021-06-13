import React, { Component } from 'react'
import { Provider } from 'react-redux'

import { store } from 'modules/store'
import LoginForm from 'components/login/LoginForm';

class LoginCardBody extends Component {
  render (): JSX.Element {
    return (
      <div className='login-card-body-component card-body with-background-image'>
        <Provider store={store}>
          <LoginForm />
        </Provider>
      </div>
    );
  }
}

export default LoginCardBody
