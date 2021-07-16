import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { BreakdownParams, Breakdown, Category } from 'types/api'
import { EditBreakdownStore } from 'types/store'
import { encodeQueryData } from 'modules/encode'
import { getBreakdowns } from 'actions/breakdownsActions'
import { patchBreakdown, deleteBreakdown } from 'actions/breakdownActions'
import {
  changeCategory, editBreakdown, exitBreakdown, clearEditedBreakdown
} from 'actions/breakdownStoreActions'
import { openAlertModal } from 'actions/alertStoreActions'
import { RootState } from 'reducers/rootReducer'
import { toBoolean } from 'modules/toBoolean'
import Trash from 'components/common/Trash'
import Cancel from 'components/common/Cancel'
import Edit from 'components/common/Edit'
import ValidationErrorMessages from 'components/common/ValidationErrorMessages'
import CategoryName from 'components/common/CategoryName'
import DestroyModal from 'components/common/DestroyModal'
import CancelModal from 'components/common/CancelModal'
import BreakdownForm from 'components/settings/breakdown/BreakdownForm'

interface ParentProps {
  breakdown: Breakdown;
}

interface StateProps {
  editBreakdownStore: EditBreakdownStore;
}

interface DispatchProps {
  editBreakdown: (breakdown: Breakdown) => void;
  exitBreakdown: () => void;
  changeCategory: (category: Category | undefined) => void;
  patchBreakdown: (id: number, params: BreakdownParams) => void;
  deleteBreakdown: (breakdownId: number) => void;
  openAlertModal: (messageType: string) => void;
}

type Props = RouteComponentProps & ParentProps & StateProps & DispatchProps

interface State {
  isOpenCancelModal: boolean;
  isOpenDestroyModal: boolean;
}

class BreakdownTableRecordContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isOpenCancelModal: false,
      isOpenDestroyModal: false
    }

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeBalanceOfPayments = this.handleChangeBalanceOfPayments.bind(this)
    this.handleChangeCategory = this.handleChangeCategory.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.handleClickCancelIcon = this.handleClickCancelIcon.bind(this)
    this.handleClickCancelButton = this.handleClickCancelButton.bind(this)
    this.handleClickClose = this.handleClickClose.bind(this)
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
    this.handleClickDestroy = this.handleClickDestroy.bind(this)
    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
    this.handleClickListIcon = this.handleClickListIcon.bind(this)
  }

  diff(): boolean {
    return this.props.breakdown.category.balance_of_payments !== this.props.editBreakdownStore.breakdown.category.balance_of_payments ||
      this.props.breakdown.name !== this.props.editBreakdownStore.breakdown.name ||
      this.props.breakdown.category_id !== this.props.editBreakdownStore.breakdown.category_id
  }

  editing(): boolean {
    return this.props.editBreakdownStore.isEditing && this.props.breakdown.id === this.props.editBreakdownStore.breakdown.id
  }

  handleClickEditIcon(): void {
    if (this.props.editBreakdownStore.isEditing) {
      this.props.openAlertModal('editing')
    } else {
      this.props.editBreakdown(this.props.breakdown)
    }
  }

  handleClickCancelIcon(): void {
    if (this.diff()) {
      this.setState({
        isOpenCancelModal: true
      })
    } else {
      this.props.exitBreakdown()
    }
  }

  handleClickCancelButton(): void {
    this.setState({
      isOpenCancelModal: false
    })
    this.props.exitBreakdown()
  }

  handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    const ENTER = 13
    if (e.keyCode === ENTER) {
      e.preventDefault()
      this.handleClickSubmitButton()
    }
  }

  handleChangeName(e: React.ChangeEvent<HTMLInputElement>): void {
    const breakdown = {
      ...this.props.editBreakdownStore.breakdown,
      name: e.target.value
    }
    this.props.editBreakdown(breakdown)
  }

  handleChangeBalanceOfPayments(e: React.ChangeEvent<HTMLInputElement>): void {
    const breakdown = {
      ...this.props.editBreakdownStore.breakdown,
      category: {
        ...this.props.editBreakdownStore.breakdown.category,
        balance_of_payments: toBoolean(e.target.value)
      }
    }
    this.props.editBreakdown(breakdown)
  }

  handleChangeCategory(category: Category | undefined): void {
    const breakdown = {
      ...this.props.editBreakdownStore.breakdown,
      category_id: category?.id || 0,
      category: category || {
        id: 0,
        name: '',
        balance_of_payments: false
      }
    }
    this.props.editBreakdown(breakdown)
  }

  handleClickSubmitButton(): void {
    const breakdown = this.props.editBreakdownStore.breakdown
    this.props.patchBreakdown(breakdown.id, breakdown)
  }

  handleClickClose(): void {
    this.setState({
      isOpenCancelModal: false,
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
    this.props.deleteBreakdown(this.props.breakdown.id)
  }

  handleClickListIcon(): void {
    const today = new Date()
    const params = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      order: 'published_at',
      page: 1,
      breakdown_id: this.props.breakdown.id
    }
    this.props.history.push({
      pathname: '/list',
      search: '?' + encodeQueryData(params)
    })
  }

  render(): JSX.Element {
    const breakdown = this.props.breakdown

    return (
      <tr className={'breakdown-item-component' + (breakdown.id === this.props.editBreakdownStore.editedBreakdownId ? ' edited' : '')}>
        {this.editing() ? (
          <td colSpan={2}>
            <ValidationErrorMessages errors={this.props.editBreakdownStore.errors} />
            <BreakdownForm
              breakdownStore={this.props.editBreakdownStore}
              onChangeBalanceOfPayments={this.handleChangeBalanceOfPayments}
              onChangeCategory={this.handleChangeCategory}
              onChangeName={this.handleChangeName}
              onClickSubmitButton={this.handleClickSubmitButton}
              onKeyDown={this.handleKeyDown}
            />
          </td>
        ) : (
          <td>
            <CategoryName balanceOfPayments={breakdown.category.balance_of_payments} name={breakdown.category.name} />
          </td>
        )}
        {!this.editing() && (
          <td>
            {breakdown.name}
          </td>
        )}
        <td className='icon-field'>
          <CancelModal
            isOpen={this.state.isOpenCancelModal}
            onClickCancel={this.handleClickCancelButton}
            onClickClose={this.handleClickClose} />
          {this.editing() ? (
            <Cancel onClickIcon={this.handleClickCancelIcon} />
          ) : (
            <Edit onClickIcon={this.handleClickEditIcon} />
          )}
        </td>
        <td className='icon-field'>
          <DestroyModal
            isOpen={this.state.isOpenDestroyModal}
            onClickCancel={this.handleClickDestroy}
            onClickClose={this.handleClickClose}
          />
          <Trash
            onClickIcon={this.handleClickTrashIcon}
          />
        </td>
        <td className='icon-field piped'>
          <span className='span' onClick={this.handleClickListIcon}>
            <i className='far fa-list-alt' />
          </span>
        </td>
      </tr>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    editBreakdownStore: state.editBreakdown
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    patchBreakdown(id: number, breakdown: BreakdownParams): void {
      dispatch(patchBreakdown(id, breakdown)).then(() => {
        dispatch(getBreakdowns()).then(() => {
          setTimeout(() => {
            dispatch(clearEditedBreakdown())
          }, 3000)
        })
      })
    },
    changeCategory(category: Category | undefined): void {
      dispatch(changeCategory(category))
    },
    editBreakdown(breakdown: Breakdown): void {
      dispatch(editBreakdown(breakdown))
    },
    exitBreakdown(): void {
      dispatch(exitBreakdown())
    },
    deleteBreakdown(breakdownId: number): void {
      dispatch(deleteBreakdown(breakdownId)).then(() => {
        dispatch(getBreakdowns())
      })
    },
    openAlertModal(messageType: string): void {
      dispatch(openAlertModal(messageType))
    }
  }
}

export default connect(mapState, mapDispatch)(withRouter(BreakdownTableRecordContainer))
