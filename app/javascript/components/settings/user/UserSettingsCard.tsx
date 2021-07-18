import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import UserSettingsForm from 'components/settings/user/UserSettingsForm'

type Props = I18nProps

class UserSettings extends Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='user-settings-card-component card'>
        <div className='card-header'>
          <i className='fas fa-user-cog left-icon' />
          {t('title.baseSetting')}
        </div>
        <div className='card-body with-background-image'>
          <UserSettingsForm />
        </div>
      </div>
    )
  }
}

export default withTranslation()(UserSettings)
