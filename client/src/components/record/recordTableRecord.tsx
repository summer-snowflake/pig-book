import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'
import { withTranslation } from 'react-i18next'

import { ReadRecord, Record, Category, Breakdown, Place } from 'types/api'
import Trash from 'components/common/trash'
import DestroyModal from 'components/common/destroyModal'
import HumanDate from 'components/common/humanDate'

interface Props extends I18nProps {
  record: ReadRecord;
  format?: string;
  editedRecordId: number | undefined;
  onClickCopy: (record: Record) => void;
  onClickEdit: (record: Record) => void;
  onClickDestroy: (record: Record) => void;
  onClickCategory?: (category: Category) => void;
  onClickBreakdown?: (breakdown: Breakdown) => void;
  onClickPlace?: (place: Place) => void;
}

interface State {
  isOpenDestroyModal: boolean;
}

class RecordTableRecord extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isOpenDestroyModal: false
    }

    this.handleClickCopy = this.handleClickCopy.bind(this)
    this.handleClickEdit = this.handleClickEdit.bind(this)
    this.handleClickClose = this.handleClickClose.bind(this)
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
    this.handleClickDestroy = this.handleClickDestroy.bind(this)
    this.handleClickCategory = this.handleClickCategory.bind(this)
    this.handleClickBreakdown = this.handleClickBreakdown.bind(this)
    this.handleClickPlace = this.handleClickPlace.bind(this)
  }

  handleClickCopy(): void {
    this.props.onClickCopy(this.props.record)
  }

  handleClickEdit(): void {
    this.props.onClickEdit(this.props.record)
  }

  handleClickClose(): void {
    this.setState({
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
    this.props.onClickDestroy(this.props.record)
  }

  handleClickCategory(): void {
    if (this.props.format === 'detail' && this.props.onClickCategory) {
      this.props.onClickCategory(this.props.record.category)
    }
  }

  handleClickBreakdown(): void {
    if (this.props.format === 'detail' && this.props.onClickBreakdown) {
      this.props.onClickBreakdown(this.props.record.breakdown)
    }
  }

  handleClickPlace(): void {
    if (this.props.format === 'detail' && this.props.onClickPlace) {
      this.props.onClickPlace(this.props.record.place)
    }
  }

  render(): JSX.Element {
    const { t } = this.props

    return (
      <tbody className={'record-table-record-component'}>
        <tr className={this.props.record.id === this.props.editedRecordId ? 'edited' : ''}>
          <td className='icon-field-td'>
            <span className='icon-field' data-tip={t('toolTip.copy')} onClick={this.handleClickCopy}>
              <i className='far fa-copy' />
              <ReactTooltip />
            </span>
          </td>
          <td className='icon-field-td'>
            <span className='icon-field' data-tip={t('toolTip.edit')} onClick={this.handleClickEdit}>
              <i className='far fa-edit' />
              <ReactTooltip />
            </span>
          </td>
          {this.props.format === 'detail' && (
            <td className='date-field-td'>
              <HumanDate date={new Date(this.props.record.published_at)} />
            </td>
          )}
          <td className='record-category-td d-none d-md-table-cell'>
            {this.props.record.category && (
              <span onClick={this.handleClickCategory}>
                <i className='fas fa-th-large left-icon yellow' />
                {this.props.record.category.name}
              </span>
            )}
          </td>
          <td className='record-breakdown-td d-none d-md-table-cell'>
            {this.props.record.breakdown && (
              <span onClick={this.handleClickBreakdown}>
                <i className='fas fa-list left-icon light-blue' />
                {this.props.record.breakdown.name}
              </span>
            )}
          </td>
          <td className='record-place-td d-none d-md-table-cell'>
            {this.props.record.place && (
              <span onClick={this.handleClickPlace}>
                <i className='fas fa-map-marker-alt left-icon blue' />
                {this.props.record.place.name}
              </span>
            )}
          </td>
          <td />
          <td className='record-charge-td'>
            {this.props.record.category.balance_of_payments === true ? (
              <i className='fas fa-plus-square left-icon blue' />
            ) : (
              <i className='fas fa-minus-square left-icon red' />
            )}
            {this.props.record.human_charge}
          </td>
          {this.props.format === 'detail' && (
            <td className={'record-cashless-charge-td' + (this.props.record.cashless_charge === 0 ? ' zero' : '')}>
              <i className='far fa-check-square left-icon' />
              {this.props.record.cashless_charge}
            </td>
          )}
          {this.props.format === 'detail' && (
            <td className={'record-point-td' + (this.props.record.cashless_charge === 0 ? ' zero' : '')}>
              <i className='fas fa-parking left-icon' />
              {this.props.record.point}
            </td>
          )}
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
        </tr>
        <tr className='d-md-none'>
          <td colSpan={2} />
          <td className='record-category-td' colSpan={2}>
            {this.props.record.category && (
              <span onClick={this.handleClickCategory}>
                <i className='fas fa-th-large left-icon yellow' />
                {this.props.record.category.name}
              </span>
            )}
          </td>
          <td className='record-breakdown-td' colSpan={2}>
            {this.props.record.breakdown && (
              <span onClick={this.handleClickBreakdown}>
                <i className='fas fa-list left-icon light-blue' />
                {this.props.record.breakdown.name}
              </span>
            )}
          </td>
          <td className='record-place-td' colSpan={2}>
            {this.props.record.place && (
              <span onClick={this.handleClickPlace}>
                <i className='fas fa-map-marker-alt left-icon blue' />
                {this.props.record.place.name}
              </span>
            )}
          </td>
        </tr>
      </tbody>
    )
  }
}

export default withTranslation()(RecordTableRecord)
