import React, { Component } from 'react'
import { Provider } from 'react-redux'

import { store } from 'modules/store'
import NavMenu from 'components/header/NavMenu'

class HeaderMenu extends Component {
  render (): JSX.Element {
    return (
      <div className='header-menu-component'>
        <Provider store={store}>
          <NavMenu />
        </Provider>
      </div>
    );
  }
}

export default HeaderMenu
