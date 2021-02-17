import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { PiggyBankParams } from 'types/api'
import { NewPiggyBankStore } from 'types/store'
import { customModalStyles } from 'modules/modalStyles'
import { changePiggyBankTitle, changePiggyBankDescription, postPiggyBank } from 'actions/piggyBankActions'
import { getPiggyBanks } from 'actions/piggyBanksActions'
import { RootState } from 'reducers/rootReducer'
import PiggyBankForm from 'components/piggy/piggyBankForm'
import CloseButton from 'components/common/closeButton'

interface ParentProps {
  isOpen: boolean;
  onClickClose: () => void;
}

interface StateProps {
  newPiggyBankStore: NewPiggyBankStore;
}

interface DispatchProps {
  postPiggyBank: (params: PiggyBankParams) => void;
  changePiggyBankTitle: (title: string) => void;
  changePiggyBankDescription: (description: string) => void;
}

type Props = ParentProps & StateProps & DispatchProps

class NewPiggyBankModalContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleChangeDescription = this.handleChangeDescription.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
  }

  handleChangeTitle(e: React.ChangeEvent<HTMLInputElement>): void {
    this.props.changePiggyBankTitle(e.target.value)
  }

  handleChangeDescription(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    this.props.changePiggyBankDescription(e.target.value)
  }

  handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    const ENTER = 13
    if (e.keyCode === ENTER) {
      e.preventDefault()
      this.handleClickSubmitButton()
    }
  }

  handleClickSubmitButton(): void {
    const params = {
      title: this.props.newPiggyBankStore.title,
      description: this.props.newPiggyBankStore.description,
      currency: this.props.newPiggyBankStore.currency
    }

    this.props.postPiggyBank(params)
  }

  render(): JSX.Element {
    return (
      <div className='new-piggy-bank-modal-component modal'>
        <div className='modal-dialog'>
          {this.props.isOpen && (
            <Modal
              ariaHideApp={false}
              contentLabel='Example Modal'
              isOpen={this.props.isOpen}
              style={customModalStyles(40)}
            >
              <div className='modal-body'>
                <PiggyBankForm
                  piggyBankStore={this.props.newPiggyBankStore}
                  onChangeTitle={this.handleChangeTitle}
                  onChangeDescription={this.handleChangeDescription}
                  onClickSubmitButton={this.handleClickSubmitButton}
                  onKeyDown={this.handleKeyDown}
                />
              </div>
              <div className='modal-footer'>
                <CloseButton onClickClose={this.props.onClickClose} />
              </div>
            </Modal>
          )}
        </div>
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    newPiggyBankStore: state.newPiggyBank
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    postPiggyBank(params: PiggyBankParams): void {
      dispatch(postPiggyBank(params)).then(() => {
        dispatch(getPiggyBanks())
      })
    },
    changePiggyBankTitle(title: string): void {
      dispatch(changePiggyBankTitle(title))
    },
    changePiggyBankDescription(description: string): void {
      dispatch(changePiggyBankDescription(description))
    }
  }
}

export default connect(mapState, mapDispatch)(NewPiggyBankModalContainer)
