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
import { RootState } from 'reducers/rootReducer'
import { toBoolean } from 'modules/toBoolean'
import Trash from 'components/common/Trash'
import Cancel from 'components/common/Cancel'
import Edit from 'components/common/Edit'
import ValidationErrorMessages from 'components/common/ValidationErrorMessages'
import CategoryName from 'components/common/CategoryName'
import DestroyModal from 'components/common/DestroyModal'
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
}

type Props = RouteComponentProps & ParentProps & StateProps & DispatchProps

interface State {
  isOpenCancelModal: boolean;
  isOpenAlertModal: boolean;
  isOpenDestroyModal: boolean;
  breakdown: Breakdown;
}

class BreakdownTableRecordContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isOpenCancelModal: false,
      isOpenAlertModal: false,
      isOpenDestroyModal: false,
      breakdown: {
        id: 0,
        category_id: 0,
        name: '',
        category: {
          id: 0,
          name: '',
          balance_of_payments: false
        }
      }
    }

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeBalanceOfPayments = this.handleChangeBalanceOfPayments.bind(this)
    this.handleChangeCategory = this.handleChangeCategory.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.handleClickCancel = this.handleClickCancel.bind(this)
    this.handleClickClose = this.handleClickClose.bind(this)
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
    this.handleClickDestroy = this.handleClickDestroy.bind(this)
    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
    this.handleClickCancelIcon = this.handleClickCancelIcon.bind(this)
    this.handleClickListIcon = this.handleClickListIcon.bind(this)
  }

  diff(): boolean {
    return this.props.breakdown.name !== this.state.breakdown.name ||
      this.props.breakdown.category_id !== this.state.breakdown.category_id
  }

  editing(): boolean {
    return this.props.breakdown.id === this.props.editBreakdownStore.breakdown.id
  }

  handleClickEditIcon(): void {
    // 編集中ではない場合
    if (this.props.editBreakdownStore.breakdown.id === 0) {
      this.props.editBreakdown(this.props.breakdown)
      this.setState({
        breakdown: this.props.breakdown
      })
    } else {
      // 他のアイテム編集中の場合
      if (this.props.editBreakdownStore.breakdown.id !== this.props.breakdown.id) {
        this.setState({
          isOpenAlertModal: true
        })
      }
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

  handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    const ENTER = 13
    if (e.keyCode === ENTER) {
      e.preventDefault()
      this.handleClickSubmitButton()
    }
  }

  handleChangeName(e: React.ChangeEvent<HTMLInputElement>): void {
    const breakdown = {
      id: this.props.breakdown.id,
      category_id: this.state.breakdown.category_id,
      name: e.target.value,
      category: this.state.breakdown.category
    }
    this.setState({
      breakdown: breakdown
    })
  }

  handleChangeBalanceOfPayments(e: React.ChangeEvent<HTMLInputElement>): void {
    const breakdown = {
      id: this.props.breakdown.id,
      name: this.props.breakdown.name,
      category_id: this.props.breakdown.category.id,
      category: {
        id: this.props.breakdown.category.id,
        name: this.props.breakdown.category.name,
        balance_of_payments: toBoolean(e.target.value)
      }
    }
    this.setState({
      breakdown: breakdown
    })
  }

  handleChangeCategory(category: Category | undefined): void {
    const breakdown = {
      id: this.state.breakdown.id,
      name: this.state.breakdown.name,
      category_id: category?.id || 0,
      category: category || {
        id: 0,
        name: '',
        balance_of_payments: false
      }
    }
    this.setState({
      breakdown: breakdown
    })
  }

  handleClickSubmitButton(): void {
    this.props.patchBreakdown(this.state.breakdown.id, this.state.breakdown)
  }

  handleClickCancel(): void {
    this.setState({
      breakdown: this.props.breakdown,
      isOpenCancelModal: false
    })
    this.props.exitBreakdown()
  }

  handleClickClose(): void {
    this.setState({
      isOpenCancelModal: false,
      isOpenAlertModal: false,
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
        <td>
          <ValidationErrorMessages errors={this.props.editBreakdownStore.errors} />
          {this.editing() ? (
            <BreakdownForm
              breakdownStore={this.props.editBreakdownStore}
              breakdown={this.state.breakdown}
              category={this.state.breakdown.category}
              disabled={this.props.editBreakdownStore.isLoading || !this.diff()}
              isLoading={this.props.editBreakdownStore.isLoading}
              onChangeBalanceOfPayments={this.handleChangeBalanceOfPayments}
              onChangeCategory={this.handleChangeCategory}
              onChangeName={this.handleChangeName}
              onClickSubmitButton={this.handleClickSubmitButton}
              onKeyDown={this.handleKeyDown}
            />
          ) : (
            <CategoryName balanceOfPayments={breakdown.category.balance_of_payments} name={breakdown.category.name} />
          )}
        </td>
        {!this.editing() && (
          <td>
            {breakdown.name}
          </td>
        )}
        <td className='icon-field'>
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
    }
  }
}

export default connect(mapState, mapDispatch)(withRouter(BreakdownTableRecordContainer))
