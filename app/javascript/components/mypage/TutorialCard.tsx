import React, { Component } from 'react'
import { Action } from 'redux'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { TutorialStore } from 'types/store'
import { getTutorial } from 'actions/tutorialActions'
import { RootState } from 'reducers/rootReducer'
import TutorialCardBody from 'components/mypage/TutorialCardBody'

interface StateProps {
  tutorialStore: TutorialStore;
}

interface DispatchProps {
  getTutorial: () => void;
}

type Props = I18nProps & StateProps & DispatchProps

class TutorialCard extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.props.getTutorial()
  }

  exists(): boolean {
    return this.props.tutorialStore.categoryExists &&
      this.props.tutorialStore.placeExists &&
        this.props.tutorialStore.recordExists
  }

  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className={!this.exists() ? 'tutorial-component card' : ''}>
        {!this.exists() && (
          <div>
            <div className='card-header'>
              <i className='fas fa-check-double left-icon' />
              {t('title.tutorial')}
            </div>
            <TutorialCardBody tutorialStore={this.props.tutorialStore} />
          </div>
        )}
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    tutorialStore: state.tutorial
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    getTutorial(): void {
      dispatch(getTutorial())
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(TutorialCard))
