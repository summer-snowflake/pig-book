import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { SketchPicker, ColorResult } from 'react-color'

import { Tag } from 'types/api'
import LoadingImage from 'components/common/loadingImage'
import ColorBox from 'components/common/colorBox'

interface State {
  colorEditing: boolean;
}

interface ParentProps {
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSubmitButton: () => void;
  onChangeColorCode: (color: string) => void;
  tag: Tag;
  disabled: boolean;
  isLoading: boolean;
}

type Props = ParentProps & I18nProps

class TagForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      colorEditing: false
    }

    this.handleClickColorCode = this.handleClickColorCode.bind(this)
    this.handleChangeColorCode = this.handleChangeColorCode.bind(this)
  }

  handleClickColorCode() {
    this.setState({
      colorEditing: !this.state.colorEditing
    })
  }

  handleChangeColorCode(color: ColorResult) {
    this.props.onChangeColorCode(color.hex)
    this.setState({
      colorEditing: false
    })
  }

  render(): JSX.Element {
    const { t } = this.props

    return (
      <form className='tag-form-component form-row'>
        <div className="form-group">
          <ColorBox colorCode={this.props.tag.color_code} onClick={this.handleClickColorCode} />
          {this.state.colorEditing && (
            <SketchPicker color={this.props.tag.color_code} onChangeComplete={this.handleChangeColorCode} />
          )}
        </div>
        <div className='form-group'>
          <input
            className='form-control'
            name='tag_name'
            onChange={this.props.onChangeName}
            onKeyDown={this.props.onKeyDown}
            type='text'
            value={this.props.tag.name}
          />
        </div>
        <div className='form-group'>
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
