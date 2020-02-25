import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import 'stylesheets/settings.sass';

interface State {
  editing: boolean
}

class SettingsTop extends Component<i18nProps, State> {
  constructor(props: i18nProps) {
    super(props);

    this.state = {
      editing: false
    }

    this.handleClickIcon = this.handleClickIcon.bind(this)
  }

  handleClickIcon() {
    this.setState({
      editing: !this.state.editing
    })
  }

  render() {
    const { t } = this.props;

    return (
      <div className='settings-top-component container'>
        <div className='card'>
          <div className='card-header'>
            <i className='fas fa-user-cog left-icon' />
            {t('menu.settingsTop')}
          </div>
          <div className='card-body with-background-image'>
            {this.state.editing && (
              <span className='badge badge-info editing-badge'>
                <i className="fas fa-pen-square left-icon"></i>
                {t('title.editing')}
              </span>
            )}
            <span className='icon-field float-right' onClick={this.handleClickIcon}>
              {this.state.editing ? (
                <FontAwesomeIcon icon={['fas', 'times']} />
              ) : (
                <FontAwesomeIcon icon={['fas', 'edit']} />
              )}
            </span>
            <form>
              <div className='form-group'>
                <label className='label'>
                  {t('label.language')}
                </label>
                <input className='' name='profile[locale]' id='profile_locale_ja' type='radio' />
                <label className='' htmlFor='profile_locale_ja'>
                  {t('label.language-ja')}
                </label>
                <input className='' name='profile[locale]' id='profile_locale_en' type='radio' />
                <label className='' htmlFor='profile_locale_en'>
                  {t('label.language-en')}
                </label>
              </div>
              <div className='form-group'>
                <label className='label'>
                  {t('label.currency')}
                </label>
                <input className='' name='profile[currency]' id='profile_currency_yen' type='radio' />
                <label className='' htmlFor='profile_currency_yen'>
                  {t('label.currency-yen')}
                </label>
                <input className='' name='profile[currency]' id='profile_currency_dollar' type='radio' />
                <label className='' htmlFor='profile_currency_dollar'>
                  {t('label.currency-dollar')}
                </label>
              </div>

              <button className='btn btn-primary' type='submit'>
                {t('button.update')}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(SettingsTop);
