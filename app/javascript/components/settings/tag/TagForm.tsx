import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { SketchPicker, ColorResult } from 'react-color'

import { EditTagStore, NewTagStore } from 'types/store'
import ColorBox from 'components/common/ColorBox'

interface State {
  colorEditing: boolean;
}

interface ParentProps {
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeColorCode: (color: string) => void;
  onClickSubmitButton: () => void;
  tagStore: NewTagStore | EditTagStore
  disabled: boolean;
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

  handleClickColorCode(): void {
    this.setState({
      colorEditing: !this.state.colorEditing
    })
  }

  handleChangeColorCode(color: ColorResult): void {
    this.props.onChangeColorCode(color.hex)
    this.setState({
      colorEditing: false
    })
  }

  render(): JSX.Element {
    const { t } = this.props

    return (
      <form className='tag-form-component'>
        <div className='form-group row'>
          <ColorBox colorCode={this.props.tagStore.tag.color_code} onClick={this.handleClickColorCode} />
          {this.state.colorEditing && (
            <SketchPicker color={this.props.tagStore.tag.color_code} onChangeComplete={this.handleChangeColorCode} />
          )}
          <input
            className='form-control'
            name='tag_name'
            onChange={this.props.onChangeName}
            onKeyDown={this.props.onKeyDown}
            type='text'
            value={this.props.tagStore.tag.name}
          />
          <button
            className='btn btn-primary'
            disabled={this.props.disabled}
            onClick={this.props.onClickSubmitButton}
            type='button'
          >
            {this.props.tagStore.tag.id ? (
              t('button.update')
            ) : (
              t('button.add')
            )}
          </button>
        </div>
      </form>
    )
  }
}

export default withTranslation()(TagForm)
