import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import 'stylesheets/errors.sass'

class Page404 extends Component<I18nProps> {
  render(): JSX.Element {
    const { t } = this.props
    const statusCode = 404

    return (
      <div className='page-404-component container'>
        <div className='status-code'>
          {statusCode}
        </div>
        <blockquote className='error-message'>
          <i className='fas fa-exclamation-triangle left-icon' />
          {t('message.pageNotFound')}
        </blockquote>
      </div>
    )
  }
}

export default withTranslation()(Page404)
