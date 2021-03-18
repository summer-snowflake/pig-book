import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'
import { withRouter } from 'react-router-dom'

import { RecordSearchParams, Tag } from 'types/api'
import { RecordSearchStore } from 'types/store'
import { RouteComponentProps } from 'types/react-router'
import { getRecords } from 'actions/recordsActions'
import { setRecordSearchParams } from 'actions/recordsStoreActions'
import { RootState } from 'reducers/rootReducer'
import KeywordButton from 'components/common/keywordButton'
import { encodeQueryData } from 'modules/encode'
import TagKeywordButton from 'components/common/tagKeywordButton'

interface StateProps {
  recordSearchStore: RecordSearchStore;
}

interface DispatchProps {
  getRecords: (params: RecordSearchParams) => void;
  setRecordSearchParams: (params: RecordSearchParams) => void;
}

type Props = I18nProps & RouteComponentProps & StateProps & DispatchProps

class SearchKeywordsContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleClickCancelMonth = this.handleClickCancelMonth.bind(this)
    this.handleChangeMonth = this.handleChangeMonth.bind(this)
    this.handleClickCancelCategory = this.handleClickCancelCategory.bind(this)
    this.handleClickCancelBreakdown = this.handleClickCancelBreakdown.bind(this)
    this.handleClickCancelPlace = this.handleClickCancelPlace.bind(this)
    this.handleClickCancelTag = this.handleClickCancelTag.bind(this)
  }

  handleClickCancelMonth(): void {
    const params = {
      ...this.props.recordSearchStore,
      month: null
    }
    this.props.setRecordSearchParams(params)
    this.props.getRecords(params)
    this.props.history.push({
      search: '?' + encodeQueryData(params)
    })
  }

  handleChangeMonth(e: React.ChangeEvent<HTMLSelectElement>): void {
    const params = {
      ...this.props.recordSearchStore,
      month: Number(e.target.value)
    }
    this.props.setRecordSearchParams(params)
    this.props.getRecords(params)
    this.props.history.push({
      search: '?' + encodeQueryData(params)
    })
  }

  handleClickCancelCategory(): void {
    const params = {
      ...this.props.recordSearchStore,
      category_id: null,
      category_name: null
    }
    this.props.setRecordSearchParams(params)
    this.props.getRecords(params)
    this.props.history.push({
      search: '?' + encodeQueryData(params)
    })
  }

  handleClickCancelBreakdown(): void {
    const params = {
      ...this.props.recordSearchStore,
      breakdown_id: null,
      breakdown_name: null
    }
    this.props.setRecordSearchParams(params)
    this.props.getRecords(params)
    this.props.history.push({
      search: '?' + encodeQueryData(params)
    })
  }

  handleClickCancelPlace(): void {
    const params = {
      ...this.props.recordSearchStore,
      place_id: null,
      place_name: null
    }
    this.props.setRecordSearchParams(params)
    this.props.getRecords(params)
    this.props.history.push({
      search: '?' + encodeQueryData(params)
    })
  }

  handleClickCancelTag(tag: Tag): void {
    const tag_ids = this.props.recordSearchStore.tag_ids
    const tag_ids_arr = tag_ids.split(',').map(t => Number(t)).filter((x) => x !== 0)
    const index = tag_ids_arr.indexOf(tag.id)
    tag_ids_arr.splice(index, 1)
    const tags = this.props.recordSearchStore.tags
    tags.splice(index, 1)
    const params = {
      ...this.props.recordSearchStore,
      tag_ids: tag_ids_arr.toString(),
      tags: tags
    }
    this.props.setRecordSearchParams(params)
    this.props.getRecords(params)
    this.props.history.push({
      search: '?' + encodeQueryData(params)
    })
  }

  render(): JSX.Element {
    const { t } = this.props
    const categoryName = (
      <span>
        <i className='fas fa-th-large left-icon yellow' />
        {this.props.recordSearchStore.category_name}
      </span>
    )
    const breakdownName = (
      <span>
        <i className='fas fa-list left-icon light-blue' />
        {this.props.recordSearchStore.breakdown_name}
      </span>
    )
    const placeName = (
      <span>
        <i className='fas fa-map-marker-alt left-icon blue' />
        {this.props.recordSearchStore.place_name}
      </span>
    )

    return (
      <div className='search-keywords-component'>
        <div className='keyword-buttons'>
          {!this.props.recordSearchStore.month && (
            <select
              className='form-control month-selectbox'
              onChange={this.handleChangeMonth}
            >
              <option>{'- ' + t('label.month') + ' -'}</option>
              {Array.from(new Array(12)).map((v,i)=> i + 1).map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          )}
          {this.props.recordSearchStore.year && (
            <KeywordButton cancelable={false} keyword={this.props.recordSearchStore.year + t('label.year')} />
          )}
          {this.props.recordSearchStore.month && (
            <KeywordButton cancelable keyword={this.props.recordSearchStore.month + t('label.month')} onClickCancel={this.handleClickCancelMonth} />
          )}
          {!!this.props.recordSearchStore.category_id && (
            <KeywordButton
              cancelable
              keyword={categoryName}
              onClickCancel={this.handleClickCancelCategory}
            />
          )}
          {!!this.props.recordSearchStore.breakdown_id && (
            <KeywordButton
              cancelable
              keyword={breakdownName}
              onClickCancel={this.handleClickCancelBreakdown}
            />
          )}
          {!!this.props.recordSearchStore.place_id && (
            <KeywordButton
              cancelable
              keyword={placeName}
              onClickCancel={this.handleClickCancelPlace}
            />
          )}
          {this.props.recordSearchStore.tags?.length > 0 && (
            <span className='vertical-border' />
          )}
          {this.props.recordSearchStore.tags?.map((tag) => (
            <TagKeywordButton key={tag.id} onClickCancel={this.handleClickCancelTag} tag={tag} />
          ))}
        </div>
      </div>
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

export default connect(mapState, mapDispatch)(withTranslation()(withRouter(SearchKeywordsContainer)))