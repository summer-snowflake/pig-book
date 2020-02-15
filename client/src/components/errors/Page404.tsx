import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import 'stylesheets/errors.sass';

import pigImage from 'images/pig-footprints-both.gif'

class Page404 extends Component<i18nProps> {
  render() {
    const { t } = this.props;

    return (
      <div className='page-404-component container'>
        <div className='status-code'>
          404
        </div>
        <blockquote className='error-message'>
          <i className='fas fa-exclamation-triangle left-icon' />
          {t('message.pageNotFound')}
        </blockquote>
      </div>
    );
  }
}

export default withTranslation()(Page404);
