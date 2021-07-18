import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { withTranslation } from 'react-i18next'
import { ThunkDispatch } from 'redux-thunk'

import { TagParams } from 'types/api'
import { NewTagStore } from 'types/store'
import { postTag } from 'actions/tagActions'
import { exitTag, newTag } from 'actions/tagStoreActions'
import { getTags } from 'actions/tagsActions'
import { RootState } from 'reducers/rootReducer'
import ValidationErrorMessages from 'components/common/ValidationErrorMessages'
import TagForm from 'components/settings/tag/TagForm'

interface StateProps {
  newTagStore: NewTagStore;
}

interface DispatchProps {
  postTag: (params: TagParams) => void;
  newTag: (tag: TagParams) => void;
}

type Props = I18nProps & StateProps & DispatchProps

class NewTagField extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleChangeColorCode = this.handleChangeColorCode.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
  }

  diff(): boolean {
    return this.props.newTagStore.tag.name !== ''
  }

  handleChangeColorCode(color: string): void {
    const tag = {
      ...this.props.newTagStore.tag,
      color_code: color
    }
    this.props.newTag(tag)
  }

  handleChangeName(e: React.ChangeEvent<HTMLInputElement>): void {
    const tag = {
      ...this.props.newTagStore.tag,
      name: e.target.value
    }
    this.props.newTag(tag)
  }

  handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    const ENTER = 13
    if (e.keyCode === ENTER) {
      e.preventDefault()
      this.handleClickSubmitButton()
    }
  }

  handleClickSubmitButton(): void {
    const params = {
      name: this.props.newTagStore.tag.name,
      color_code: this.props.newTagStore.tag.color_code
    }

    this.props.postTag(params)
  }

  render(): JSX.Element {
    return (
      <div className='tag-create-form-component'>
        <ValidationErrorMessages errors={this.props.newTagStore.errors} />
        <TagForm
          disabled={this.props.newTagStore.isLoading || !this.diff()}
          onChangeName={this.handleChangeName}
          onChangeColorCode={this.handleChangeColorCode}
          onClickSubmitButton={this.handleClickSubmitButton}
          onKeyDown={this.handleKeyDown}
          tagStore={this.props.newTagStore}
        />
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    newTagStore: state.newTag
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    postTag(params: TagParams): void {
      dispatch(postTag(params)).then(() => {
        dispatch(getTags()).then(() => {
          dispatch(exitTag())
        })
      })
    },
    newTag(tag: TagParams): void {
      dispatch(newTag(tag))
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(NewTagField))
