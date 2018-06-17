import React from 'react'
import { I18n } from 'react-i18next'
import i18n from './../plugins/i18n'

class Currency extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <I18n>{(t) => {
        return (
          <span>{t('currency')}</span>
        )
      }}</I18n>
    )
  }
}

export default Currency
