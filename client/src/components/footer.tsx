import React, { Component} from 'react'

import 'stylesheets/footer.sass'

class Footer extends Component {
  render(): JSX.Element {
    return (
      <footer className='footer-component footer'>
        <small className='copyright'>
          {'Copyright © 2004-2020 @kae_kasui All Rights Reserved.'}
        </small>
      </footer>
    )
  }
}

export default Footer
