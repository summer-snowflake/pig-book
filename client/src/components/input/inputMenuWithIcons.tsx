import React, { Component } from 'react'
import HeaderMenuWithIcons from 'components/common/headerMenuWithIconsContainer'

import 'stylesheets/menu.sass'

class InputMenuWithIcons extends Component {
  render(): JSX.Element {
    return (
      <ul className='input-menu-with-icons-component nav flex-column side-menu'>
        <HeaderMenuWithIcons />
      </ul>
    )
  }
}

export default InputMenuWithIcons
