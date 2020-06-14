import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import { Tag } from 'types/api'
import LoadingImage from 'components/common/loadingImage'

interface ParentProps {
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSubmitButton: () => void;
  tag: Tag;
  disabled: boolean;
  isLoading: boolean;
}

type Props = ParentProps & I18nProps

class TagForm extends Component<Props> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <form className='tag-form-component form-row'>
        <div className='form-group col-md-7'>
          <input
            className='form-control'
            name='tag_name'
            onChange={this.props.onChangeName}
            onKeyDown={this.props.onKeyDown}
            type='text'
            value={this.props.tag.name}
          />
        </div>
        <div className='form-group col-md-3'>
          <button
            className='btn btn-primary'
            disabled={this.props.disabled}
            onClick={this.props.onClickSubmitButton}
            type='button'
          >
            {this.props.tag.id ? (
              t('button.update')
            ) : (
              t('button.add')
            )}
          </button>
        </div>
        <div className='loading-image-form'>
          {this.props.isLoading && (
            <LoadingImage />
          )}
        </div>
      </form>
    )
  }
}

export default withTranslation()(TagForm)
