import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import PickerField from 'components/input/pickerField'
import RecordsOnInputContainer from 'components/input/recordsOnInputContainer'
import NewRecordFormContainer from 'components/input/newRecordFormContainer'

import 'stylesheets/input.sass'

class InputPage extends Component<I18nProps> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='input-page-component container-fluid'>
        <div className='row'>
          <div className='col-1 d-lg-none' />
          <div className='col'>
            <div className='card'>
              <div className='card-header'>
                <i className='fas fa-palette left-icon' />
                {t('menu.input')}
              </div>
              <div className='card-body with-background-image'>
                <div className='row'>
                  <PickerField />
                  <div className='col-md-4'>
                    <NewRecordFormContainer />
                  </div>
                  <RecordsOnInputContainer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslation()(InputPage)
