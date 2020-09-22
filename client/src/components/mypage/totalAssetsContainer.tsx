import React, { Component } from 'react'
import { Action } from 'redux'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { withTranslation } from 'react-i18next'

import { CategoriesStore } from 'types/store'
import { getCategories } from 'actions/categoriesActions'
import { RootState } from 'reducers/rootReducer'

interface StateProps {
  categoriesStore: CategoriesStore;
}

interface DispatchProps {
  getCategories: () => void;
}

type Props = I18nProps & StateProps & DispatchProps

class TotalAssetsContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='total-assets-component'>
        <div className='card'>
          <div className='card-header'>
            <i className='fas fa-coins left-icon' />
            {t('title.totalAssets')}
          </div>
          <div className='card-body with-background-image'>

          </div>
        </div>
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    categoriesStore: state.categories
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    getCategories(): void {
      dispatch(getCategories())
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(TotalAssetsContainer))
