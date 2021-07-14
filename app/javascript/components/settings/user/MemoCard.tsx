import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'

import { ProfileStore } from 'types/store'
import { openEditMemoModal } from 'actions/profileStoreActions'
import { RootState } from 'reducers/rootReducer'
import Edit from 'components/common/Edit'
import MemoModal from 'components/settings/user/MemoModal'

interface StateProps {
  profileStore: ProfileStore;
}

interface DispatchProps {
  openEditMemoModal: () => void;
}

type Props = I18nProps & StateProps & DispatchProps

class MemoCard extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isOpenModal: false
    }

    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
  }

  handleClickEditIcon(): void {
    this.props.openEditMemoModal()
  }

  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='memo-card-component card'>
        <div className='card-header'>
          <i className='fas fa-book-open left-icon' />
          {t('title.memo')}
        </div>
        <div className='card-body with-background-image memo-card-body-component'>
          <div className='text-align-right icon-field'>
            <Edit onClickIcon={this.handleClickEditIcon} />
          </div>
          <span className='text-field'>
            {this.props.profileStore.memo}
          </span>
          <MemoModal />
        </div>
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    profileStore: state.profile
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    openEditMemoModal(): void {
      dispatch(openEditMemoModal())
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(MemoCard))
