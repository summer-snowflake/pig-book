import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import RecordsListContainer from 'components/list/recordsListContainer'

import 'stylesheets/list.sass'

class ListPage extends Component<I18nProps> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='list-page-component container-fluid'>
        <div className='row'>
          <div className='col-1 d-lg-none' />
          <div className='col'>
            <div className='card'>
              <div className='card-header'>
                <i className='fas fa-align-justify left-icon' />
                {t('menu.list')}
              </div>
              <div className='card-body with-background-image'>
                <RecordsListContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslation()(ListPage)
