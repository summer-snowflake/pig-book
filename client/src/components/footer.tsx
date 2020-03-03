import React, { Component} from 'react'

import 'stylesheets/footer.sass'

class Footer extends Component {
  render(): JSX.Element {
    const copyright = 'Copyright © 2004-2020 @kae_kasui All Rights Reserved.'
    return (
      <footer className='footer-component footer'>
        <span className='copyright'>
          {copyright}
        </span>
      </footer>
    )
  }
}

export default Footer
