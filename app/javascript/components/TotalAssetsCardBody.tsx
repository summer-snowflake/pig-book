import React, { Component } from 'react'
import { Provider } from 'react-redux'

import AssetsAccountsList from 'components/mypage/AssetsAccountsList'
import { store } from 'modules/store'

import 'stylesheets/mypage.sass'

class TotalAssetsCardBody extends Component {
  render(): JSX.Element {
    return (
      <div className='total-assets-card-body-component card-body with-background-image'>
        <Provider store={store}>
          <AssetsAccountsList />
        </Provider>
      </div>
    )
  }
}

export default TotalAssetsCardBody
