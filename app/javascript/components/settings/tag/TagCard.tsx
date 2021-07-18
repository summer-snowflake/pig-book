import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import NewTagField from 'components/settings/tag/NewTagField'
import TagsList from 'components/settings/tag/TagsList'

class TagCard extends Component<I18nProps> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='tag-card-component'>
        <div className='card'>
          <div className='card-header'>
            <i className='fas fa-bookmark left-icon' />
            {t('menu.tag')}
          </div>
          <div className='card-body with-background-image'>
            <NewTagField />
            <TagsList />
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslation()(TagCard)
