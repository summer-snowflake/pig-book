import React, { Component } from 'react'
import { Action } from 'redux'
import { withTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { ProfileParams } from 'types/api'
import { ProfileStore } from 'types/store'
import EditAndCancel from 'components/common/editAndCancel'
import CancelUpdateModal from 'components/common/cancelUpdateModal'
import AlertModal from 'components/common/alertModal'
import { getProfile, patchProfile, changeProfileLocale, changeProfileCurrency, setEditing } from 'actions/settingsActions'
import { RootState } from 'reducers/rootReducer'

import 'stylesheets/settings.sass'
import LoadingImage from 'components/common/loadingImage'

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
  changeProfileLocale: (locale: string) => void;
  changeProfileCurrency: (currency: string) => void;
  patchProfile: (params: ProfileParams, target: string) => void;
  setEditing: (editing: boolean) => void;
}

type Props = I18nProps & StateProps & DispatchProps

class BaseSettingsContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isOpenCancelModal: false,
      isOpenAlertModal: false,
      locale: 'ja',
      currency: 'yen'
    }

    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
    this.handleClickExitIcon = this.handleClickExitIcon.bind(this)
    this.handleChangeLocale = this.handleChangeLocale.bind(this)
    this.handleChangeCurrency = this.handleChangeCurrency.bind(this)
    this.handleClickCancel = this.handleClickCancel.bind(this)
    this.handleClickClose = this.handleClickClose.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)

    this.props.getProfile()
  }

  diff(): boolean {
    return this.props.profileStore.editing && (this.state.locale !== this.props.profileStore.locale || this.state.currency !== this.props.profileStore.currency)
  }

  checkIconClass(target: string, value: string): string {
    return target === value ? 'dark-green' : 'light-green'
  }

  handleClickEditIcon(): void {
    if (this.props.profileStore.editingMemo) {
      this.setState({
        isOpenAlertModal: true
      })
    } else {
      this.props.setEditing(!this.props.profileStore.editing)
      this.setState({
        locale: this.props.profileStore.locale,
        currency: this.props.profileStore.currency
      })
    }
  }

  handleClickExitIcon(): void {
    if (this.diff()) {
      this.setState({
        isOpenCancelModal: true
      })
    } else {
      this.props.setEditing(false)
    }
  }

  handleChangeLocale(e: React.ChangeEvent<HTMLInputElement>): void {
    this.props.changeProfileLocale(e.target.value)
  }

  handleChangeCurrency(e: React.ChangeEvent<HTMLInputElement>): void {
    this.props.changeProfileCurrency(e.target.value)
  }

  handleClickCancel(): void {
    this.props.changeProfileLocale(this.state.locale)
    this.props.changeProfileCurrency(this.state.currency)
    this.props.setEditing(false)
    this.setState({
      isOpenCancelModal: false,
    })
  }

  handleClickClose(): void {
    this.setState({
      isOpenCancelModal: false,
      isOpenAlertModal: false
    })
  }

  handleClickSubmitButton(): void {
    const params = {
      locale: this.props.profileStore.locale,
      currency: this.props.profileStore.currency,
      memo: this.props.profileStore.memo
    }
    this.props.patchProfile(params, 'base')
  }

  render(): JSX.Element {
    const { t } = this.props

    const jsx = (
      <form>
        <div className='form-group'>
          <label className='label'>
            {t('label.language')}
          </label>
          {this.props.profileStore.editing ? (
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
          ) : (
            <span>
              {t('label.language-' + this.props.profileStore.locale)}
            </span>
          )}
        </div>
        <div className='form-group'>
          <label className='label'>
            {t('label.currency')}
          </label>
          {this.props.profileStore.editing ? (
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
          ) : (
            <span>
              {t('label.currency-' + this.props.profileStore.currency)}
            </span>
          )}
        </div>

        {this.props.profileStore.editing && (
          <button
            className='btn btn-primary'
            disabled={this.props.profileStore.isLoading || !this.diff()}
            onClick={this.handleClickSubmitButton}
            type='button'
          >
            {t('button.update')}
          </button>
        )}
        {this.props.profileStore.editing && this.props.profileStore.isLoading && (
          <LoadingImage />
        )}
      </form>
    )

    return (
      <div className='settings-top-component'>
        <CancelUpdateModal
          isOpen={this.state.isOpenCancelModal}
          onClickCancel={this.handleClickCancel}
          onClickClose={this.handleClickClose}
        />
        <div className='card'>
          <div className='card-header'>
            <i className='fas fa-user-cog left-icon' />
            {t('title.baseSetting')}
          </div>
          <div className='card-body with-background-image'>
            <EditAndCancel
              editing={this.props.profileStore.editing}
              onClickEditIcon={this.handleClickEditIcon}
              onClickExitIcon={this.handleClickExitIcon}
            />
            <AlertModal
              isOpen={this.state.isOpenAlertModal}
              messageType='editingOther'
              onClickClose={this.handleClickClose}
            />
            {jsx}
          </div>
        </div>
      </div>
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
    changeProfileLocale(locale: string): void {
      dispatch(changeProfileLocale(locale))
    },
    changeProfileCurrency(locale: string): void {
      dispatch(changeProfileCurrency(locale))
    },
    patchProfile(params: ProfileParams, target: string): void {
      dispatch(patchProfile(params, target))
    },
    setEditing(editing: boolean): void {
      dispatch(setEditing(editing))
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(BaseSettingsContainer))
