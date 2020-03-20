import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'

import { RecordSearchParams } from 'types/api'
import { RecordSearchStore } from 'types/store'
import { getRecords, setRecordSearchParams } from 'actions/recordsActions'
import { RootState } from 'reducers/rootReducer'
import KeywordButton from 'components/common/keywordButton'

interface StateProps {
  recordSearchStore: RecordSearchStore;
}

interface DispatchProps {
  getRecords: (params: RecordSearchParams) => void;
  setRecordSearchParams: (params: RecordSearchParams) => void;
}

type Props = I18nProps & StateProps & DispatchProps

class SearchKeywordsContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleClickCancelMonth = this.handleClickCancelMonth.bind(this)
  }

  handleClickCancelMonth(): void {
    const params = {
      ...this.props.recordSearchStore,
      month: null
    }
    this.props.setRecordSearchParams(params)
    this.props.getRecords(params)
  }

  render(): JSX.Element {
    const { t } = this.props

    return (
      <span className='search-keywords-component'>
        {this.props.recordSearchStore.year && (
          <KeywordButton cancelable={false} keyword={this.props.recordSearchStore.year + t('label.year')} />
        )}
        {this.props.recordSearchStore.month && (
          <KeywordButton cancelable keyword={this.props.recordSearchStore.month + t('label.month')} onClickCancel={this.handleClickCancelMonth} />
        )}
      </span>
    )
  }
}


function mapState(state: RootState): StateProps {
  return {
    recordSearchStore: state.recordSearch
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    getRecords(params: RecordSearchParams): void {
      dispatch(getRecords(params))
    },
    setRecordSearchParams(params: RecordSearchParams): void {
      dispatch(setRecordSearchParams(params))
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(SearchKeywordsContainer))