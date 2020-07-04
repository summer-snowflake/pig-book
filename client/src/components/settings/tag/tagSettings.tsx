import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import TagPostFormContainer from 'components/settings/tag/tagPostFormContainer'
import TagsListContainer from 'components/settings/tag/tagsListContainer'

class TagSettings extends Component<I18nProps> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='tag-settings-component'>
        <div className='card'>
          <div className='card-header'>
            <i className='fas fa-bookmark left-icon' />
            {t('menu.tag')}
          </div>
          <div className='card-body with-background-image'>
            <TagPostFormContainer />
            <TagsListContainer />
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslation()(TagSettings)
