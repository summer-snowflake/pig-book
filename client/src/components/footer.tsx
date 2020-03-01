import React, { Component} from 'react'

import 'stylesheets/footer.sass'

class Footer extends Component {
  render() {
    return (
      <footer className='footer-component footer'>
        <span className='copyright'>
          Copyright © 2004-2020 @kae_kasui All Rights Reserved.
        </span>
      </footer>
    )
  }
}

export default Footer
