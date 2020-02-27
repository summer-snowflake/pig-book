import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

import { getSettings, changeSettingsLocale, changeSettingsCurrency } from 'actions/settingsActions';

import 'stylesheets/settings.sass';
import CancelUpdateModal from 'components/common/cancelUpdateModal';

interface State {
  editing: boolean,
  isOpenCancelModal: boolean,
  locale: string,
  currency: string
}

interface Props {
  getSettings: any,
  changeSettingsLocale: any,
  changeSettingsCurrency: any,
  settings: {
    isLoading: boolean,
    locale: string,
    currency: string
  }
}

class SettingsTopContainer extends Component<i18nProps & Props, State> {
  constructor(props: i18nProps & Props) {
    super(props);

    this.state = {
      editing: false,
      isOpenCancelModal: false,
      locale: 'ja',
      currency: 'yen'
    }

    this.handleClickIcon = this.handleClickIcon.bind(this)
    this.handleChangeLocale = this.handleChangeLocale.bind(this)
    this.handleChangeCurrency = this.handleChangeCurrency.bind(this)
    this.handleClickCancel = this.handleClickCancel.bind(this)
    this.handleClickClose = this.handleClickClose.bind(this)

    this.props.getSettings();
  }

  handleClickIcon() {
    if (this.state.editing && (this.state.locale !== this.props.settings.locale || this.state.currency !== this.props.settings.currency)) {
      this.setState({
        isOpenCancelModal: true
      })
    } else {
      this.setState({
        editing: !this.state.editing,
        locale: this.props.settings.locale,
        currency: this.props.settings.currency
      })
    }
  }

  handleChangeLocale(e: any) {
    this.props.changeSettingsLocale(e.target.value);
  }

  handleChangeCurrency(e: any) {
    this.props.changeSettingsCurrency(e.target.value);
  }

  handleClickCancel() {
    this.props.changeSettingsLocale(this.state.locale);
    this.props.changeSettingsCurrency(this.state.currency);
    this.setState({
      isOpenCancelModal: false,
      editing: false
    })
  }

  handleClickClose() {
    this.setState({
      isOpenCancelModal: false
    })
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
                {this.state.editing ? (
                  <span>
                    <input
                      className=''
                      checked={this.props.settings.locale === 'ja'}
                      onChange={this.handleChangeLocale}
                      name='profile[locale]'
                      value='ja'
                      id='profile_locale_ja'
                      type='radio' />
                    <label className='' htmlFor='profile_locale_ja'>
                      {t('label.language-ja')}
                    </label>
                    <input
                      className=''
                      checked={this.props.settings.locale === 'en'}
                      onChange={this.handleChangeLocale}
                      name='profile[locale]'
                      value='en'
                      id='profile_locale_en'
                      type='radio' />
                    <label className='' htmlFor='profile_locale_en'>
                      {t('label.language-en')}
                    </label>
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
                {this.state.editing ? (
                  <span>
                    <input
                      className=''
                      checked={this.props.settings.currency === 'yen'}
                      onChange={this.handleChangeCurrency}
                      name='profile[currency]'
                      id='profile_currency_yen'
                      value='yen'
                      type='radio' />
                    <label className='' htmlFor='profile_currency_yen'>
                      {t('label.currency-yen')}
                    </label>
                    <input
                      className=''
                      checked={this.props.settings.currency === 'dollar'}
                      onChange={this.handleChangeCurrency}
                      name='profile[currency]'
                      id='profile_currency_dollar'
                      value='dollar'
                      type='radio' />
                    <label className='' htmlFor='profile_currency_dollar'>
                      {t('label.currency-dollar')}
                    </label>
                  </span>
                ) : (
                  <span>
                    {t('label.currency-' + this.props.settings.currency)}
                  </span>
                )}
              </div>

              {this.state.editing && (
                <button className='btn btn-primary' type='submit'>
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
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(SettingsTopContainer));
