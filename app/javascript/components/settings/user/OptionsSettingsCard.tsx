import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import OptionsSettingsForm from 'components/settings/user/OptionsSettingsForm'

type Props = I18nProps

class OptionsSettingsCard extends Component<Props> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='options-settings-card-component card'>
        <div className='card-header'>
          <i className='fas fa-cogs left-icon' />
          {t('title.optionsSetting')}
        </div>
        <div className='card-body'>
          <OptionsSettingsForm />
        </div>
      </div>
    )
  }
}

export default withTranslation()(OptionsSettingsCard)
