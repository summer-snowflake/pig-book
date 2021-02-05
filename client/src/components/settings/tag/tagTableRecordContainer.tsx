import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { RouteComponentProps } from 'types/react-router'
import { withRouter } from 'react-router-dom'

import { Tag, TagParams } from 'types/api'
import { EditTagStore } from 'types/store'
import { encodeQueryData } from 'modules/encode'
import { getTags } from 'actions/tagsActions'
import { patchTag, deleteTag, editTag, exitTag } from 'actions/tagActions'
import { RootState } from 'reducers/rootReducer'
import EditAndCancel from 'components/common/editAndCancel'
import TagForm from 'components/settings/tag/tagForm'
import CancelUpdateModal from 'components/common/cancelUpdateModal'
import DestroyModal from 'components/common/destroyModal'
import ValidationErrorMessages from 'components/common/validationErrorMessages'
import AlertModal from 'components/common/alertModal'
import ListIcon from 'components/common/listIcon'
import Trash from 'components/common/trash'
import TagName from 'components/common/tagName'

interface StateProps {
  editTagStore: EditTagStore;
}

interface DispatchProps {
  patchTag: (id: number, params: TagParams) => void;
  deleteTag: (tagId: number) => void;
  editTag: (tag: Tag) => void;
  exitTag: () => void;
}

interface ParentProps {
  tag: Tag;
}

type Props = RouteComponentProps & ParentProps & StateProps & DispatchProps

interface State {
  isOpenCancelModal: boolean;
  isOpenAlertModal: boolean;
  isOpenDestroyModal: boolean;
  tag: Tag;
}

class TagTableRecordContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isOpenCancelModal: false,
      isOpenAlertModal: false,
      isOpenDestroyModal: false,
      tag: {
        id: 0,
        name: '',
        color_code: ''
      }
    }

    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
    this.handleClickExitIcon = this.handleClickExitIcon.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.handleClickCancel = this.handleClickCancel.bind(this)
    this.handleClickSubmit = this.handleClickSubmit.bind(this)
    this.handleClickClose = this.handleClickClose.bind(this)
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
    this.handleClickDestroy = this.handleClickDestroy.bind(this)
    this.handleClickSitemap = this.handleClickSitemap.bind(this)
  }

  diff(): boolean {
    return this.props.tag.name !== this.state.tag.name
  }

  editing(): boolean {
    return this.props.tag.id === this.props.editTagStore.tag.id
  }

  handleClickEditIcon(): void {
    // 編集中ではない場合
    if (this.props.editTagStore.tag.id === 0) {
      this.props.editTag(this.props.tag)
      this.setState({
        tag: this.props.tag
      })
    } else {
      // 他のアイテム編集中の場合
      if (this.props.editTagStore.tag.id !== this.props.tag.id) {
        this.setState({
          isOpenAlertModal: true
        })
      }
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
      id: this.props.tag.id,
      name: e.target.value,
      color_code: this.state.tag.color_code
    }
    this.setState({
      tag: tag
    })
  }

  handleClickSubmitButton(): void {
    this.props.patchTag(this.state.tag.id, this.state.tag)
  }

  handleClickCancel(): void {
    this.setState({
      tag: this.props.tag,
      isOpenCancelModal: false
    })
    this.props.exitTag()
  }

  handleClickSubmit(): void {
    //this.setState({
    //  isOpenCategorizedModal: false
    //})
    //this.props.postTagCategories(this.props.tag.id, categoryIds)
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

  handleClickSitemap(): void {
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
      <tr className={'tag-table-record-component' + (this.props.tag.id === this.props.editTagStore.editedTagId ? ' edited' : '')}>
        {this.editing() ? (
          <td className='tag-field-td' colSpan={2}>
            <CancelUpdateModal
              isOpen={this.state.isOpenCancelModal}
              onClickCancel={this.handleClickCancel}
              onClickClose={this.handleClickClose}
            />
            <TagForm
              disabled={this.props.editTagStore.isLoading || !this.diff()}
              isLoading={this.props.editTagStore.isLoading}
              onChangeName={this.handleChangeName}
              onClickSubmitButton={this.handleClickSubmitButton}
              onKeyDown={this.handleKeyDown}
              tag={this.state.tag}
            />
            <ValidationErrorMessages messages={this.props.editTagStore.errors} />
          </td>
        ) : (
          <td className='tag-field-td' colSpan={2}>
            <AlertModal
              isOpen={this.state.isOpenAlertModal}
              messageType='editingOther'
              onClickClose={this.handleClickClose}
            />
            <TagName tag={this.props.tag} />
          </td>
        )}
        <td className='icon-field-td'>
          <EditAndCancel
            editing={this.editing()}
            onClickEditIcon={this.handleClickEditIcon}
            onClickExitIcon={this.handleClickExitIcon}
          />
        </td>
        <td className='trash-field-td'>
          <DestroyModal
            isOpen={this.state.isOpenDestroyModal}
            onClickCancel={this.handleClickDestroy}
            onClickClose={this.handleClickClose}
          />
          <Trash
            onClickIcon={this.handleClickTrashIcon}
          />
        </td>
        <td className='icon-field-td piped'>
          <ListIcon onClickIcon={this.handleClickSitemap} />
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
          dispatch(exitTag())
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
    }
  }
}

export default connect(mapState, mapDispatch)(withRouter(TagTableRecordContainer))
