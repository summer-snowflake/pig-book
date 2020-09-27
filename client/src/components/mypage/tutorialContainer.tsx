import React, { Component } from 'react'
import { Action } from 'redux'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { NavLink } from 'react-router-dom'

import { TutorialStore } from 'types/store'
import { getTutorial } from 'actions/tutorialActions'
import { getProfile } from 'actions/settingsActions'
import { RootState } from 'reducers/rootReducer'
import CheckMark from 'components/mypage/checkMark'

interface StateProps {
  tutorialStore: TutorialStore;
}

interface DispatchProps {
  getTutorial: () => void;
  getProfile: () => void;
}

type Props = I18nProps & StateProps & DispatchProps

class TutorialContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.props.getTutorial()
    // TODO: 国際化対応のために一旦取得する。マイページの他の箇所で取得するようにしたら削除する
    this.props.getProfile()
  }

  exists(): boolean {
    return this.props.tutorialStore.categoryExists && this.props.tutorialStore.placeExists && this.props.tutorialStore.recordExists
  }

  render(): JSX.Element {
    const { t } = this.props

    const jsx = (
      <table className='table'>
        <tbody>
          <tr>
            <td>
              <CheckMark check={this.props.tutorialStore.categoryExists} />
            </td>
            <td className='tutorial-link'>
              <NavLink to='/categories'>
                <i className='fas fa-cog left-icon' />
                {t('menu.settings')} {'>'} {t('menu.category')}
              </NavLink>
            </td>
            <td>
              {t('label.tutorial-category')}
            </td>
          </tr>
          <tr>
            <td>
              <CheckMark check={this.props.tutorialStore.placeExists} />
            </td>
            <td className='tutorial-link'>
              <NavLink to='/places'>
                <i className='fas fa-cog left-icon' />
                {t('menu.settings')} {'>'} {t('menu.place')}
              </NavLink>
            </td>
            <td>
              {t('label.tutorial-place')}
            </td>
          </tr>
          <tr>
            <td>
              <CheckMark check={this.props.tutorialStore.recordExists} />
            </td>
            <td className='tutorial-link'>
              <NavLink to='/input'>
                <i className='fas fa-palette left-icon' />
                {t('menu.input')}
              </NavLink>
            </td>
            <td>
              {t('label.tutorial-record')}
            </td>
          </tr>
        </tbody>
      </table>
    )

    return (
      <div className={!this.exists() ? 'tutorial-component' : ''}>
        {!this.exists() && (
          <div className='card'>
            <div className='card-header'>
              <i className='fas fa-check-double left-icon' />
              {t('title.tutorial')}
            </div>
            <div className='card-body with-background-image'>
              {jsx}
            </div>
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
    },
    getProfile(): void {
      dispatch(getProfile())
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(TutorialContainer))
