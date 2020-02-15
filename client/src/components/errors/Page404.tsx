import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import 'stylesheets/errors.sass';

import pigImage from 'images/pig-footprints-both.gif'

class Page404 extends Component<i18nProps> {
  render() {
    return (
      <div className='page-404-component container'>
        <div className='status-code'>
          404
        </div>
        <blockquote className='error-message'>
          お探しのページは見つかりませんでした。
        </blockquote>
      </div>
    );
  }
}

export default withTranslation()(Page404);