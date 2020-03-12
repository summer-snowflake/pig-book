import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import { Place } from 'types/api'
import LoadingImage from 'components/common/loadingImage'

interface ParentProps {
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSubmitButton: () => void;
  place: Place;
  disabled: boolean;
  isLoading: boolean;
}

type Props = ParentProps & I18nProps

class PlaceForm extends Component<Props> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <form className='place-form-component form-row'>
        <div className='form-group col-md-8'>
          <input
            className='form-control'
            name='place_name'
            onChange={this.props.onChangeName}
            onKeyDown={this.props.onKeyDown}
            type='text'
            value={this.props.place.name}
          />
        </div>
        <div className='form-group col-auto'>
          <button
            className='btn btn-primary'
            disabled={this.props.disabled}
            onClick={this.props.onClickSubmitButton}
            type='button'
          >
            {this.props.place.id ? (
              t('button.update')
            ) : (
              t('button.add')
            )}
          </button>
        </div>
        {this.props.isLoading && (
          <LoadingImage />
        )}
      </form>
    )
  }
}

export default withTranslation()(PlaceForm)
