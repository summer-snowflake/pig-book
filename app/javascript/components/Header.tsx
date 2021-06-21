import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import NavMenu from 'components/header/NavMenu'
import brandImage from 'images/pig.gif'

type Props = I18nProps

class Header extends Component<Props> {
  render (): JSX.Element {
    const { t } = this.props

    return (
      <header className='header-component header'>
        <nav className='nav-brand'>
          <img alt={t('brand_name')} className='brand-image' src={brandImage} />
          <span className='brand-name'>{t('brand_name')}</span>
        </nav>
        <NavMenu />
        <div className='clear' />
      </header>
    );
  }
}

export default withTranslation()(Header)
