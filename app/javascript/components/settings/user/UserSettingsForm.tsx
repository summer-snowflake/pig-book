import React, { Component } from 'react'
import { Action } from 'redux'
import { withTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { ProfileParams } from 'types/api'
import { ProfileStore } from 'types/store'
import { getProfile, patchProfile } from 'actions/profileActions'
import { RootState } from 'reducers/rootReducer'

interface State {
  isOpenCancelModal: boolean;
  isOpenAlertModal: boolean;
  locale: string;
  currency: string;
}

interface StateProps {
  profileStore: ProfileStore;
}

interface DispatchProps {
  getProfile: () => void;
  patchProfile: (params: ProfileParams) => void;
}

type Props = I18nProps & StateProps & DispatchProps

class UserSettingForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.handleChangeLocale = this.handleChangeLocale.bind(this)
    this.handleChangeCurrency = this.handleChangeCurrency.bind(this)

    this.props.getProfile()
  }

  handleChangeLocale(e: React.ChangeEvent<HTMLInputElement>): void {
    const params = {
      locale: e.target.value
    }
    this.props.patchProfile(params)
  }

  handleChangeCurrency(e: React.ChangeEvent<HTMLInputElement>): void {
    const params = {
      currency: e.target.value
    }
    this.props.patchProfile(params)
  }

  render(): JSX.Element {
    const { t } = this.props

    return (
      <form className='user-setting-form-component'>
        <div className='form-group'>
          <label className='form-label'>{t('label.language')}</label>
          <span>
            <span className='radio-span'>
              <input
                checked={this.props.profileStore.locale === 'ja'}
                className='radio-input'
                id='profile_locale_ja'
                name='profile[locale]'
                onChange={this.handleChangeLocale}
                type='radio'
                value='ja'
              />
              <label className='radio-label' htmlFor='profile_locale_ja'>
                <FontAwesomeIcon className='left-icon' icon={['fas', 'check']} />
                {t('label.language-ja')}
              </label>
            </span>
            <span className='radio-span'>
              <input
                checked={this.props.profileStore.locale === 'en'}
                className='radio-input'
                id='profile_locale_en'
                name='profile[locale]'
                onChange={this.handleChangeLocale}
                type='radio'
                value='en'
              />
              <label className='radio-label' htmlFor='profile_locale_en'>
                <FontAwesomeIcon className='left-icon' icon={['fas', 'check']} />
                {t('label.language-en')}
              </label>
            </span>
          </span>
        </div>
        <div className='form-group'>
        <label className='form-label'>{t('label.currency')}</label>
          <span>
            <span className='radio-span'>
              <input
                checked={this.props.profileStore.currency === 'yen'}
                className='radio-input'
                id='profile_currency_yen'
                name='profile[currency]'
                onChange={this.handleChangeCurrency}
                type='radio'
                value='yen'
              />
              <label className='radio-label' htmlFor='profile_currency_yen'>
                <FontAwesomeIcon className='left-icon' icon={['fas', 'check']} />
                {t('label.currency-yen')}
              </label>
            </span>
            <span className='radio-span'>
              <input
                checked={this.props.profileStore.currency === 'dollar'}
                className='radio-input'
                id='profile_currency_dollar'
                name='profile[currency]'
                onChange={this.handleChangeCurrency}
                type='radio'
                value='dollar'
              />
              <label className='radio-label' htmlFor='profile_currency_dollar'>
                <FontAwesomeIcon className='left-icon' icon={['fas', 'check']} />
                {t('label.currency-dollar')}
              </label>
            </span>
          </span>
        </div>
      </form>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    profileStore: state.profile
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    getProfile(): void {
      dispatch(getProfile())
    },
    patchProfile(params: ProfileParams): void {
      dispatch(patchProfile(params)).then(() => {
        dispatch(getProfile())
      })
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(UserSettingForm))
