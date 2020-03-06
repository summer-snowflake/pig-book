import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { BreakdownParams, Breakdown, Category } from 'types/api'
import { EditBreakdownStore } from 'types/store'
import EditAndCancel from 'components/common/editAndCancel'
import CategoryName from 'components/settings/category/categoryName'
import BreakdownName from 'components/settings/breakdown/breakdownName'
import BreakdownForm from 'components/settings/breakdown/breakdownForm'
import CancelUpdateModal from 'components/common/cancelUpdateModal'
import ValidationErrorMessages from 'components/common/validationErrorMessages'
import AlertModal from 'components/common/alertModal'
import { getBreakdowns, switchEditing } from 'actions/breakdownsActions'
import { changeCategory, patchBreakdown } from 'actions/breakdownActions'
import { RootState } from 'reducers/rootReducer'
import { toBoolean } from 'modules/toBoolean'

interface StateProps {
  editBreakdown: EditBreakdownStore;
}

interface DispatchProps {
  switchEditing: (editingId: number) => void;
  changeCategory: (category: Category | undefined) => void;
  patchBreakdown: (id: number, params: BreakdownParams) => void;
}

interface ParentProps {
  breakdown: Breakdown;
}

type Props = ParentProps & StateProps & DispatchProps

interface State {
  isOpenCancelModal: boolean;
  isOpenAlertModal: boolean;
  breakdown: Breakdown;
}

class BreakdownTableRecordContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isOpenCancelModal: false,
      isOpenAlertModal: false,
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

    this.handleClickIcon = this.handleClickIcon.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeBalanceOfPayments = this.handleChangeBalanceOfPayments.bind(this)
    this.handleChangeCategory = this.handleChangeCategory.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.handleClickCancel = this.handleClickCancel.bind(this)
    this.handleClickClose = this.handleClickClose.bind(this)
  }

  diff(): boolean {
    return this.props.breakdown.name !== this.state.breakdown.name ||
      this.props.breakdown.category_id !== this.state.breakdown.category_id
  }

  handleClickIcon(): void {
    // 編集中ではない編集アイコン
    if (this.props.editBreakdown.editingId === 0) {
      this.props.switchEditing(this.props.breakdown.id)
      this.setState({
        breakdown: this.props.breakdown
      })
    }
    // 編集中の編集アイコン
    if (this.props.editBreakdown.editingId !== 0 && this.props.editBreakdown.editingId !== this.props.breakdown.id) {
      this.setState({
        isOpenAlertModal: true
      })
    }
    // キャンセルアイコン
    if (this.props.editBreakdown.editingId === this.props.breakdown.id) {
      if (this.diff()) {
        this.setState({
          isOpenCancelModal: true
        })
      } else {
        this.props.switchEditing(0)
      }
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
    this.props.switchEditing(0)
  }

  handleClickClose(): void {
    this.setState({
      isOpenCancelModal: false,
      isOpenAlertModal: false
    })
  }

  render(): JSX.Element {
    const editing = this.props.editBreakdown.editingId === this.props.breakdown.id

    return (
      <tr className='breakdown-table-record-component'>
        {editing && (
          <td colSpan={2}>
            <CancelUpdateModal
              isOpen={this.state.isOpenCancelModal}
              onClickCancel={this.handleClickCancel}
              onClickClose={this.handleClickClose}
            />
            <BreakdownForm
              breakdown={this.state.breakdown}
              category={this.state.breakdown.category}
              disabled={this.props.editBreakdown.isLoading || !this.diff()}
              onChangeBalanceOfPayments={this.handleChangeBalanceOfPayments}
              onChangeCategory={this.handleChangeCategory}
              onChangeName={this.handleChangeName}
              onClickSubmitButton={this.handleClickSubmitButton}
              onKeyDown={this.handleKeyDown}
            />
            <ValidationErrorMessages messages={this.props.editBreakdown.errors} />
          </td>
        )}
        {!editing && (
          <td>
            <CategoryName category={this.props.breakdown.category} />
          </td>
        )}
        {!editing && (
          <td>
            <BreakdownName breakdown={this.props.breakdown} />
            <AlertModal
              isOpen={this.state.isOpenAlertModal}
              messageType='editingOther'
              onClickClose={this.handleClickClose}
            />
          </td>
        )}
        <td className='icon-field-td'>
          <EditAndCancel
            editing={this.props.editBreakdown.editingId === this.props.breakdown.id}
            onClickIcon={this.handleClickIcon}
          />
        </td>
      </tr>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    editBreakdown: state.editBreakdown
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    patchBreakdown(id: number, breakdown: BreakdownParams): void {
      dispatch(patchBreakdown(id, breakdown)).then(() => {
        dispatch(getBreakdowns())
      })
    },
    changeCategory(category: Category | undefined): void {
      dispatch(changeCategory(category))
    },
    switchEditing(editingId: number): void {
      dispatch(switchEditing(editingId))
    }
  }
}

export default connect(mapState, mapDispatch)(BreakdownTableRecordContainer)
