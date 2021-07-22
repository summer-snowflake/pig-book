import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import PickerField from 'components/input/PickerField'
import NewRecordField from 'components/input/NewRecordField'
import RecordsListByDay from 'components/input/RecordsListByDay'

import 'stylesheets/input.sass'

class InputPage extends Component<I18nProps> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='input-page-component'>
        <div className='card'>
          <div className='card-header'>
            <i className='fas fa-palette left-icon' />
            {t('menu.input')}
          </div>
          <div className='card-body with-background-image'>
            <div className='row'>
              <div className='col-3'>
                <PickerField />
              </div>
              <div className='col-3'>
                <NewRecordField />
              </div>
              <div className='col'>
                <RecordsListByDay />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslation()(InputPage)
