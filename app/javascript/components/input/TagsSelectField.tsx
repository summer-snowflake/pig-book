import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'

import { Tag } from 'types/api'
import { TagsStore } from 'types/store'
import { getTags } from 'actions/tagsActions'
import { addNewRecordTag, removeNewRecordTag } from 'actions/newRecordStoreActions'
import { addEditRecordTag, removeEditRecordTag } from 'actions/editRecordStoreActions'
import { RootState } from 'reducers/rootReducer'
import TagLabel from 'components/common/TagLabel'
import TagListItem from 'components/input/TagListItem'

interface State {
  editing: boolean;
}

interface ParentProps {
  recordTags: Tag[];
  recordId: number | undefined;
}

interface StateProps {
  tagsStore: TagsStore;
}

interface DispatchProps {
  getTags: () => void;
  addNewRecordTag: (tag: Tag) => void;
  addEditRecordTag: (tag: Tag) => void;
  removeNewRecordTag: (tag: Tag) => void;
  removeEditRecordTag: (tag: Tag) => void;
}

type Props = ParentProps & StateProps & DispatchProps

class TagsSelectField extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      editing: false
    }

    this.handleClickCancel = this.handleClickCancel.bind(this)
    this.handleClickBox = this.handleClickBox.bind(this)
    this.handleClickTagName = this.handleClickTagName.bind(this)
    this.handleClickTag = this.handleClickTag.bind(this)
    this.handleBlur = this.handleBlur.bind(this)

    this.props.getTags()
  }

  handleClickBox(): void {
    this.setState({
      editing: !this.state.editing
    })
  }

  handleClickCancel(tag: Tag): void {
    if (this.props.recordId === undefined) {
      this.props.removeNewRecordTag(tag)
    } else {
      this.props.removeEditRecordTag(tag)
    }
  }

  handleClickTagName(tag: Tag): void {
    this.setState({
      editing: false
    })
    if (!this.props.recordTags.some((t) => t.id === tag.id)) {
      if (this.props.recordId === undefined) {
        this.props.addNewRecordTag(tag)
      } else {
        this.props.addEditRecordTag(tag)
      }
    }
  }

  handleClickTag(tag: Tag): void {
    console.log('click tag: ' + tag.name)
  }

  handleBlur(): void {
    // NOTE: ラベルの選択前にフォーカスが外れリストのクリックができないため、
    // フォーカス解除後0.1秒間のリスト表示を行ってクリックできるようにする
    setTimeout(() => {
      this.setState({
        editing: false
      })
    }, 100)
  }

  render(): JSX.Element {
    return (
      <div className='tags-select-form-component'>
        <div className='tag-labels-field'>
          {this.props.recordTags.map((tag) => (
            <TagLabel key={tag.id} tag={tag} onClickCancel={this.handleClickCancel} onClickButton={this.handleClickTag} />
          ))}
        </div>
        <div className='data-list-field'>
          <input type='text' className='form-control' onClick={this.handleClickBox} onBlur={this.handleBlur} />
          <ul className={'data-list-items' + (this.state.editing ? ' active' : '')}>
            {this.props.tagsStore.tags.map((tag: Tag) => (
              <TagListItem key={tag.id} tag={tag} onClickTagName={this.handleClickTagName} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    tagsStore: state.tags
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    getTags(): void {
      dispatch(getTags())
    },
    addNewRecordTag(tag: Tag): void {
      dispatch(addNewRecordTag(tag))
    },
    addEditRecordTag(tag: Tag): void {
      dispatch(addEditRecordTag(tag))
    },
    removeNewRecordTag(tag: Tag): void {
      dispatch(removeNewRecordTag(tag))
    },
    removeEditRecordTag(tag: Tag): void {
      dispatch(removeEditRecordTag(tag))
    }
  }
}

export default connect(mapState, mapDispatch)(TagsSelectField)
