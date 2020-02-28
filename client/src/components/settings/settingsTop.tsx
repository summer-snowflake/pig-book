import React, { Component } from 'react';

import BaseSettingsContainer from 'components/settings/baseSettingsContainer';
import MemoContainer from 'components/settings/memoContainer';

import 'stylesheets/settings.sass';

class SettingsTop extends Component {
  render() {
    return (
      <div className='settings-top-component container'>
        <BaseSettingsContainer />
        <MemoContainer />
      </div>
    );
  }
}

export default SettingsTop;
