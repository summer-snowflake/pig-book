import React, { Component } from 'react'
import { Action } from 'redux'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { Tag } from 'types/api'
import { TagsStore } from 'types/store'
import { getTags } from 'actions/tagsActions'
import { RootState } from 'reducers/rootReducer'
import LoadingImage from 'components/common/LoadingImage'
import TagItem from 'components/settings/tag/TagItem'

interface StateProps {
  tagsStore: TagsStore;
}

interface DispatchProps {
  getTags: () => void;
}

type Props = StateProps & DispatchProps

class TagsList extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.props.getTags()
  }

  render(): JSX.Element {
    return (
      <div className='tags-list-component'>
        <div className='counter'>
          {this.props.tagsStore.tags.length + ' / 20'}
        </div>
        <table className='table'>
          <tbody>
            {this.props.tagsStore.tags.map((tag: Tag) => (
              <TagItem key={tag.id} tag={tag} />
            ))}
            {this.props.tagsStore.tags.length === 0 && this.props.tagsStore.isLoading && (
              <LoadingImage />
            )}
          </tbody>
        </table>
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

export default connect(mapState, mapDispatch)(TagsList)
