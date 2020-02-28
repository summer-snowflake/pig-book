import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

import EditAndCancel from 'components/common/editAndCancel';
import { getSettings, patchSettings, changeSettingsLocale, changeSettingsCurrency, setEditing } from 'actions/settingsActions';

import 'stylesheets/settings.sass';
import CancelUpdateModal from 'components/common/cancelUpdateModal';

interface State {
  isOpenCancelModal: boolean,
  locale: string,
  currency: string
}

interface Props {
  getSettings: any,
  changeSettingsLocale: any,
  changeSettingsCurrency: any,
  patchSettings: any,
  setEditing: any,
  settings: {
    editing: boolean,
    isLoading: boolean,
    locale: string,
    currency: string
  }
}

class BaseSettingsContainer extends Component<i18nProps & Props, State> {
  constructor(props: i18nProps & Props) {
    super(props);

    this.state = {
      isOpenCancelModal: false,
      locale: 'ja',
      currency: 'yen'
    }

    this.handleClickIcon = this.handleClickIcon.bind(this)
    this.handleChangeLocale = this.handleChangeLocale.bind(this)
    this.handleChangeCurrency = this.handleChangeCurrency.bind(this)
    this.handleClickCancel = this.handleClickCancel.bind(this)
    this.handleClickClose = this.handleClickClose.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)

    this.props.getSettings();
  }

  diff(): boolean {
    return this.props.settings.editing && (this.state.locale !== this.props.settings.locale || this.state.currency !== this.props.settings.currency);
  }

  checkIconClass(target: string, value: string): string {
    return target === value ? 'dark-green' : 'light-green'
  }

  handleClickIcon() {
    if (this.diff()) {
      this.setState({
        isOpenCancelModal: true
      })
    } else {
      this.props.setEditing(!this.props.settings.editing)
      this.setState({
        locale: this.props.settings.locale,
        currency: this.props.settings.currency
      })
    }
  }

  handleChangeLocale(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.changeSettingsLocale(e.target.value);
  }

  handleChangeCurrency(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.changeSettingsCurrency(e.target.value);
  }

  handleClickCancel() {
    this.props.changeSettingsLocale(this.state.locale);
    this.props.changeSettingsCurrency(this.state.currency);
    this.props.setEditing(false)
    this.setState({
      isOpenCancelModal: false,
    })
  }

  handleClickClose() {
    this.setState({
      isOpenCancelModal: false
    })
  }

  handleClickSubmitButton() {
    const params = {
      locale: this.props.settings.locale,
      currency: this.props.settings.currency
    }
    this.props.patchSettings(params);
  }

  render() {
    const { t } = this.props;

    return (
      <div className='settings-top-component container'>
        <CancelUpdateModal
          isOpen={this.state.isOpenCancelModal}
          handleClickCancel={this.handleClickCancel}
          handleClickClose={this.handleClickClose} />
        <div className='card'>
          <div className='card-header'>
            <i className='fas fa-user-cog left-icon' />
            {t('title.baseSetting')}
          </div>
          <div className='card-body with-background-image'>
            {this.props.settings.editing && (
              <span className='badge badge-info editing-badge'>
                <i className="fas fa-pen-square left-icon"></i>
                {t('title.editing')}
              </span>
            )}
            <EditAndCancel editing={this.props.settings.editing} handleClickIcon={this.handleClickIcon} />
            <form>
              <div className='form-group'>
                <label className='label'>
                  {t('label.language')}
                </label>
                {this.props.settings.editing ? (
                  <span>
                    <span className='radio-span'>
                      <input
                        className='radio-input'
                        checked={this.props.settings.locale === 'ja'}
                        onChange={this.handleChangeLocale}
                        name='profile[locale]'
                        value='ja'
                        id='profile_locale_ja'
                        type='radio' />
                      <label className='radio-label' htmlFor='profile_locale_ja'>
                        <FontAwesomeIcon icon={['fas', 'check']} className={'left-icon ' + this.checkIconClass(this.props.settings.locale, 'ja')} />
                        {t('label.language-ja')}
                      </label>
                    </span>
                    <span className='radio-span'>
                      <input
                        className='radio-input'
                        checked={this.props.settings.locale === 'en'}
                        onChange={this.handleChangeLocale}
                        name='profile[locale]'
                        value='en'
                        id='profile_locale_en'
                        type='radio' />
                      <label className='radio-label' htmlFor='profile_locale_en'>
                        <FontAwesomeIcon icon={['fas', 'check']} className={'left-icon ' + this.checkIconClass(this.props.settings.locale, 'en')} />
                        {t('label.language-en')}
                      </label>
                    </span>
                  </span>
                ) : (
                  <span>
                    {t('label.language-' + this.props.settings.locale)}
                  </span>
                )}
              </div>
              <div className='form-group'>
                <label className='label'>
                  {t('label.currency')}
                </label>
                {this.props.settings.editing ? (
                  <span>
                    <span className='radio-span'>
                      <input
                        className='radio-input'
                        checked={this.props.settings.currency === 'yen'}
                        onChange={this.handleChangeCurrency}
                        name='profile[currency]'
                        id='profile_currency_yen'
                        value='yen'
                        type='radio' />
                      <label className='radio-label' htmlFor='profile_currency_yen'>
                        <FontAwesomeIcon icon={['fas', 'check']} className={'left-icon ' + this.checkIconClass(this.props.settings.currency, 'yen')} />
                        {t('label.currency-yen')}
                      </label>
                    </span>
                    <span className='radio-span'>
                      <input
                        className='radio-input'
                        checked={this.props.settings.currency === 'dollar'}
                        onChange={this.handleChangeCurrency}
                        name='profile[currency]'
                        id='profile_currency_dollar'
                        value='dollar'
                        type='radio' />
                      <label className='radio-label' htmlFor='profile_currency_dollar'>
                        <FontAwesomeIcon icon={['fas', 'check']} className={'left-icon ' + this.checkIconClass(this.props.settings.currency, 'dollar')} />
                        {t('label.currency-dollar')}
                      </label>
                    </span>
                  </span>
                ) : (
                  <span>
                    {t('label.currency-' + this.props.settings.currency)}
                  </span>
                )}
              </div>

              {this.props.settings.editing && (
                <button
                  className={'btn btn-primary' + (this.props.settings.isLoading || !this.diff() ? ' disabled' : '')}
                  disabled={this.props.settings.isLoading || !this.diff()}
                  onClick={this.handleClickSubmitButton}
                  type='button'>
                  {t('button.update')}
                </button>
              )}
           </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state: any) {
  return {
    settings: state.settings
  };
}

function mapDispatch(dispatch: any) {
  return {
    getSettings() {
      dispatch(getSettings());
    },
    changeSettingsLocale(locale: string) {
      dispatch(changeSettingsLocale(locale))
    },
    changeSettingsCurrency(locale: string) {
      dispatch(changeSettingsCurrency(locale))
    },
    patchSettings(params: State) {
      dispatch(patchSettings(params));
    },
    setEditing(editing: boolean) {
      dispatch(setEditing(editing));
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(BaseSettingsContainer));
