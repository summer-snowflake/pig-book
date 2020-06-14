import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { withTranslation } from 'react-i18next'
import { ThunkDispatch } from 'redux-thunk'

import { TagParams } from 'types/api'
import { NewTagStore } from 'types/store'
import ValidationErrorMessages from 'components/common/validationErrorMessages'
import TagForm from 'components/settings/tag/tagForm'
import { postTag, changeTagName, exitTag } from 'actions/tagActions'
import { getTags } from 'actions/tagsActions'
import { RootState } from 'reducers/rootReducer'

interface StateProps {
  newTag: NewTagStore;
}

interface DispatchProps {
  postTag: (params: TagParams) => void;
  changeTagName: (name: string) => void;
}

type Props = I18nProps & StateProps & DispatchProps

class TagPostFormContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
  }

  diff(): boolean {
    return this.props.newTag.name !== ''
  }

  handleChangeName(e: React.ChangeEvent<HTMLInputElement>): void {
    this.props.changeTagName(e.target.value)
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
      name: this.props.newTag.name,
      color_code: this.props.newTag.color_code
    }

    this.props.postTag(params)
  }

  render(): JSX.Element {
    return (
      <div className='tag-create-form-component'>
        <TagForm
          disabled={this.props.newTag.isLoading || !this.diff()}
          isLoading={this.props.newTag.isLoading}
          onChangeName={this.handleChangeName}
          onClickSubmitButton={this.handleClickSubmitButton}
          onKeyDown={this.handleKeyDown}
          tag={this.props.newTag}
        />
        <ValidationErrorMessages messages={this.props.newTag.errors} />
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    newTag: state.newTag
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
    changeTagName(name: string): void {
      dispatch(changeTagName(name))
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(TagPostFormContainer))
