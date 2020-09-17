import React, { Component } from 'react'

import HeaderMenuWithIcons from 'components/common/headerMenuWithIconsContainer'

import 'stylesheets/menu.sass'

class AdminMenuWithIcons extends Component {
  render(): JSX.Element {
    return (
      <ul className='admin-menu-with-icons-component nav flex-column side-menu'>
        <HeaderMenuWithIcons />
      </ul>
    )
  }
}

export default AdminMenuWithIcons
