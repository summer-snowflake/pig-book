import { App } from 'components/App'
import React from 'react'
import ReactDOM from 'react-dom'

import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'

import 'stylesheets/application.scss'
import 'plugins/i18n'

require.context('../images/', true)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div'))
  )
})
