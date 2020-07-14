import React, { Component } from 'react'
import { Action } from 'redux'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { Tag } from 'types/api'
import { TagsStore } from 'types/store'
import { getTags } from 'actions/tagsActions'
import { RootState } from 'reducers/rootReducer'
import TagTableRecordContainer from 'components/settings/tag/tagTableRecordContainer'
import LoadingImage from 'components/common/loadingImage'
import Counter from 'components/common/counter'

interface StateProps {
  tagsStore: TagsStore;
}

interface DispatchProps {
  getTags: () => void;
}

type Props = StateProps & DispatchProps

class TagsListContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.props.getTags()
  }

  render(): JSX.Element {
    return (
      <div className='tags-list-component'>
        <Counter count={this.props.tagsStore.tags.length} max={20} />
        <table className='table'>
          <tbody>
            {this.props.tagsStore.tags.map((tag: Tag) => (
              <TagTableRecordContainer key={tag.id} tag={tag} />
            ))}
          </tbody>
        </table>
        {this.props.tagsStore.tags.length === 0 && this.props.tagsStore.isLoading && (
          <LoadingImage />
        )}
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
    }
  }
}

export default connect(mapState, mapDispatch)(TagsListContainer)
