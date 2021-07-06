import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import UserSettingForm from 'components/settings/user/UserSettingForm'

type Props = I18nProps

class BaseSettings extends Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='settings-top-component'>
        <div className='card'>
          <div className='card-header'>
            <i className='fas fa-user-cog left-icon' />
            {t('title.baseSetting')}
          </div>
          <div className='card-body with-background-image'>
            <UserSettingForm />
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslation()(BaseSettings)
