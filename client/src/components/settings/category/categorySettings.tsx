import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import CategoryCreateFormContainer from 'components/settings/category/categoryCreateFormContainer';

class CategorySettings extends Component<i18nProps> {
  render() {
    const { t } = this.props;

    return (
      <div className='category-settings-component'>
        <div className='card'>
          <div className='card-header'>
            <i className='fas fa-th-large left-icon' />
            {t('menu.category')}
          </div>
          <div className='card-body with-background-image'>
            <CategoryCreateFormContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(CategorySettings);
