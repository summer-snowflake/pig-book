import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

import EditAndCancel from 'components/common/editAndCancel';
import { getProfile, patchProfile, changeProfileLocale, changeProfileCurrency, setEditing } from 'actions/settingsActions';

import 'stylesheets/settings.sass';
import CancelUpdateModal from 'components/common/cancelUpdateModal';

interface State {
  isOpenCancelModal: boolean,
  locale: string,
  currency: string
}

interface Props {
  getProfile: any,
  changeProfileLocale: any,
  changeProfileCurrency: any,
  patchProfile: any,
  setEditing: any,
  profile: {
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

    this.props.getProfile();
  }

  diff(): boolean {
    return this.props.profile.editing && (this.state.locale !== this.props.profile.locale || this.state.currency !== this.props.profile.currency);
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
      this.props.setEditing(!this.props.profile.editing)
      this.setState({
        locale: this.props.profile.locale,
        currency: this.props.profile.currency
      })
    }
  }

  handleChangeLocale(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.changeProfileLocale(e.target.value);
  }

  handleChangeCurrency(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.changeProfileCurrency(e.target.value);
  }

  handleClickCancel() {
    this.props.changeProfileLocale(this.state.locale);
    this.props.changeProfileCurrency(this.state.currency);
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
      locale: this.props.profile.locale,
      currency: this.props.profile.currency
    }
    this.props.patchProfile(params);
  }

  render() {
    const { t } = this.props;

    return (
      <div className='settings-top-component'>
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
            <EditAndCancel editing={this.props.profile.editing} handleClickIcon={this.handleClickIcon} />
            <form>
              <div className='form-group'>
                <label className='label'>
                  {t('label.language')}
                </label>
                {this.props.profile.editing ? (
                  <span>
                    <span className='radio-span'>
                      <input
                        className='radio-input'
                        checked={this.props.profile.locale === 'ja'}
                        onChange={this.handleChangeLocale}
                        name='profile[locale]'
                        value='ja'
                        id='profile_locale_ja'
                        type='radio' />
                      <label className='radio-label' htmlFor='profile_locale_ja'>
                        <FontAwesomeIcon icon={['fas', 'check']} className='left-icon' />
                        {t('label.language-ja')}
                      </label>
                    </span>
                    <span className='radio-span'>
                      <input
                        className='radio-input'
                        checked={this.props.profile.locale === 'en'}
                        onChange={this.handleChangeLocale}
                        name='profile[locale]'
                        value='en'
                        id='profile_locale_en'
                        type='radio' />
                      <label className='radio-label' htmlFor='profile_locale_en'>
                        <FontAwesomeIcon icon={['fas', 'check']} className='left-icon' />
                        {t('label.language-en')}
                      </label>
                    </span>
                  </span>
                ) : (
                  <span>
                    {t('label.language-' + this.props.profile.locale)}
                  </span>
                )}
              </div>
              <div className='form-group'>
                <label className='label'>
                  {t('label.currency')}
                </label>
                {this.props.profile.editing ? (
                  <span>
                    <span className='radio-span'>
                      <input
                        className='radio-input'
                        checked={this.props.profile.currency === 'yen'}
                        onChange={this.handleChangeCurrency}
                        name='profile[currency]'
                        id='profile_currency_yen'
                        value='yen'
                        type='radio' />
                      <label className='radio-label' htmlFor='profile_currency_yen'>
                        <FontAwesomeIcon icon={['fas', 'check']} className='left-icon' />
                        {t('label.currency-yen')}
                      </label>
                    </span>
                    <span className='radio-span'>
                      <input
                        className='radio-input'
                        checked={this.props.profile.currency === 'dollar'}
                        onChange={this.handleChangeCurrency}
                        name='profile[currency]'
                        id='profile_currency_dollar'
                        value='dollar'
                        type='radio' />
                      <label className='radio-label' htmlFor='profile_currency_dollar'>
                        <FontAwesomeIcon icon={['fas', 'check']} className='left-icon' />
                        {t('label.currency-dollar')}
                      </label>
                    </span>
                  </span>
                ) : (
                  <span>
                    {t('label.currency-' + this.props.profile.currency)}
                  </span>
                )}
              </div>

              {this.props.profile.editing && (
                <button
                  className='btn btn-primary'
                  disabled={this.props.profile.isLoading || !this.diff()}
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
    profile: state.profile
  };
}

function mapDispatch(dispatch: any) {
  return {
    getProfile() {
      dispatch(getProfile());
    },
    changeProfileLocale(locale: string) {
      dispatch(changeProfileLocale(locale))
    },
    changeProfileCurrency(locale: string) {
      dispatch(changeProfileCurrency(locale))
    },
    patchProfile(params: State) {
      dispatch(patchProfile(params));
    },
    setEditing(editing: boolean) {
      dispatch(setEditing(editing));
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(BaseSettingsContainer));
