import React, { Component } from 'react';

import SettingsMenu from 'components/settings/settingsMenu'
import SettingsTop from 'components/settings/settingsTopContainer'

class SettingsTopPage extends Component {
  render() {
    return (
      <div className="settings-top-page-component container">
        <div className='row'>
          <div className='col-3 d-none d-lg-block'>
            <SettingsMenu />
          </div>
          <div className='col-1 d-lg-none'>
          </div>
          <div className='col'>
            <SettingsTop />
          </div>
        </div>
      </div>
    );
  }
}

export default SettingsTopPage;
