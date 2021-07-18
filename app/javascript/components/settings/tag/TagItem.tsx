import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { Tag, TagParams } from 'types/api'
import { EditTagStore } from 'types/store'
import { encodeQueryData } from 'modules/encode'
import { getTags } from 'actions/tagsActions'
import { patchTag, deleteTag } from 'actions/tagActions'
import { editTag, exitTag, clearEditedTag } from 'actions/tagStoreActions'
import { openAlertModal } from 'actions/alertStoreActions'
import { RootState } from 'reducers/rootReducer'
import TagForm from 'components/settings/tag/TagForm'
import DestroyModal from 'components/common/DestroyModal'
import ValidationErrorMessages from 'components/common/ValidationErrorMessages'
import Trash from 'components/common/Trash'
import TagName from 'components/common/TagName'
import Cancel from 'components/common/Cancel'
import Edit from 'components/common/Edit'
import CancelModal from 'components/common/CancelModal'

interface StateProps {
  editTagStore: EditTagStore;
}

interface DispatchProps {
  patchTag: (id: number, params: TagParams) => void;
  deleteTag: (tagId: number) => void;
  editTag: (tag: Tag) => void;
  exitTag: () => void;
  openAlertModal: (messageType: string) => void;
}

interface ParentProps {
  tag: Tag;
}

type Props = RouteComponentProps & ParentProps & StateProps & DispatchProps

interface State {
  isOpenCancelModal: boolean;
  isOpenAlertModal: boolean;
  isOpenDestroyModal: boolean;
}

class TagItem extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isOpenCancelModal: false,
      isOpenAlertModal: false,
      isOpenDestroyModal: false,
    }

    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
    this.handleClickExitIcon = this.handleClickExitIcon.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeColorCode = this.handleChangeColorCode.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.handleClickCancelIcon = this.handleClickCancelIcon.bind(this)
    this.handleClickCancelButton = this.handleClickCancelButton.bind(this)
    this.handleClickClose = this.handleClickClose.bind(this)
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
    this.handleClickDestroy = this.handleClickDestroy.bind(this)
    this.handleClickListIcon = this.handleClickListIcon.bind(this)
  }

  diff(): boolean {
    return this.props.tag.name !== this.props.editTagStore.tag.name || this.props.tag.color_code !== this.props.editTagStore.tag.color_code
  }

  editing(): boolean {
    return this.props.tag.id === this.props.editTagStore.tag.id
  }

  handleClickEditIcon(): void {
    if (this.props.editTagStore.isEditing) {
      this.props.openAlertModal('editing')
    } else {
      this.props.editTag(this.props.tag)
    }
  }

  handleClickExitIcon(): void {
    if (this.diff()) {
      this.setState({
        isOpenCancelModal: true
      })
    } else {
      this.props.exitTag()
    }
  }

  handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    const ENTER = 13
    if (e.keyCode === ENTER) {
      e.preventDefault()
      this.handleClickSubmitButton()
    }
  }

  handleChangeName(e: React.ChangeEvent<HTMLInputElement>): void {
    const tag = {
      ...this.props.editTagStore.tag,
      name: e.target.value
    }
    this.props.editTag(tag)
  }

  handleChangeColorCode(colorCode: string): void {
    const tag = {
      ...this.props.editTagStore.tag,
      color_code: colorCode
    }
    this.props.editTag(tag)
  }

  handleClickSubmitButton(): void {
    const tag = {
      ...this.props.editTagStore.tag
    }
    this.props.patchTag(tag.id, tag)
  }

  handleClickCancelButton(): void {
    this.setState({
      isOpenCancelModal: false
    })
    this.props.exitTag()
  }

  handleClickCancelIcon(): void {
    if (this.diff()) {
      this.setState({
        isOpenCancelModal: true
      })
    } else {
      this.props.exitTag()
    }
  }

  handleClickClose(): void {
    this.setState({
      isOpenCancelModal: false,
      isOpenAlertModal: false,
      isOpenDestroyModal: false
    })
  }

  handleClickTrashIcon(): void {
    this.setState({
      isOpenDestroyModal: true
    })
  }

  handleClickDestroy(): void {
    this.setState({
      isOpenDestroyModal: false
    })
    this.props.deleteTag(this.props.tag.id)
  }

  handleClickListIcon(): void {
    const today = new Date()
    const params = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      order: 'published_at',
      page: 1,
      tag_ids: String(this.props.tag.id)
    }
    this.props.history.push({
      pathname: '/list',
      search: '?' + encodeQueryData(params)
    })
  }

  render(): JSX.Element {
    return (
      <tr className={'tag-item-component' + (this.props.tag.id === this.props.editTagStore.editedTagId ? ' edited' : '')}>
        {this.editing() ? (
          <td>
            <ValidationErrorMessages errors={this.props.editTagStore.errors} />
            <TagForm
              disabled={this.props.editTagStore.isLoading || !this.diff()}
              onChangeName={this.handleChangeName}
              onChangeColorCode={this.handleChangeColorCode}
              onClickSubmitButton={this.handleClickSubmitButton}
              onKeyDown={this.handleKeyDown}
              tagStore={this.props.editTagStore}
            />
          </td>
        ) : (
          <td>
            <TagName tag={this.props.tag} />
          </td>
        )}
        <td className='icon-field'>
          <CancelModal
            isOpen={this.state.isOpenCancelModal}
            onClickCancel={this.handleClickCancelButton}
            onClickClose={this.handleClickClose} />
          {this.editing() ? (
            <Cancel onClickIcon={this.handleClickCancelIcon} />
          ) : (
            <Edit onClickIcon={this.handleClickEditIcon} />
          )}
        </td>
        <td className='icon-field'>
          <DestroyModal
            isOpen={this.state.isOpenDestroyModal}
            onClickCancel={this.handleClickDestroy}
            onClickClose={this.handleClickClose}
          />
          <Trash
            onClickIcon={this.handleClickTrashIcon}
          />
        </td>
        <td className='icon-field piped'>
          <span className='span' onClick={this.handleClickListIcon}>
            <i className='far fa-list-alt' />
          </span>
        </td>
      </tr>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    editTagStore: state.editTag
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    patchTag(id: number, tag: TagParams): void {
      dispatch(patchTag(id, tag)).then(() => {
        dispatch(getTags()).then(() => {
          setTimeout(() => {
            dispatch(clearEditedTag())
          }, 3000)
        })
      })
    },
    editTag(tag: Tag): void {
      dispatch(editTag(tag))
    },
    exitTag(): void {
      dispatch(exitTag())
    },
    deleteTag(tagId: number): void {
      dispatch(deleteTag(tagId)).then(() => {
        dispatch(getTags())
      })
    },
    openAlertModal(messageType: string): void {
      dispatch(openAlertModal(messageType))
    }
  }
}

export default connect(mapState, mapDispatch)(withRouter(TagItem))
