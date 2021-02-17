import EditAndCancel from 'components/common/editAndCancel'
import React, { Component } from 'react'

import { EditPiggyBankStore, PiggyBankStore } from 'types/store'
import Trash from 'components/common/trash'
import DestroyModal from 'components/common/destroyModal'
import PiggyBankForm from 'components/piggy/piggyBankForm'
import CancelUpdateModal from 'components/common/cancelUpdateModal'

interface ParentProps {
  editPiggyBankStore: EditPiggyBankStore;
  piggyBankStore: PiggyBankStore;
  onClickEditIcon: () => void;
  onClickExitIcon: () => void;
  onClickSubmitButton: () => void;
  onChangeTitle: (title: string) => void;
  onChangeDescription: (description: string) => void;
  onClickTrashIcon: () => void;
}

type Props = ParentProps

interface State {
  isDestroyModalOpen: boolean;
  isCancelUpdateModalOpen: boolean;
}

class PiggyBankContentContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isDestroyModalOpen: false,
      isCancelUpdateModalOpen: false
    }

    this.handleClickExitIcon = this.handleClickExitIcon.bind(this)
    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.handleClickEditCancelButton = this.handleClickEditCancelButton.bind(this)
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
    this.handleClickCancelButton = this.handleClickCancelButton.bind(this)
    this.handleClickCloseButton = this.handleClickCloseButton.bind(this)
    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleChangeDescription = this.handleChangeDescription.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleClickEditIcon(): void {
    this.props.onClickEditIcon()
  }

  handleClickExitIcon(): void {
    const piggyBank = this.props.piggyBankStore.piggyBank
    const editPiggyBank = this.props.editPiggyBankStore
    if (piggyBank) {
      if (piggyBank.title !== editPiggyBank.title || piggyBank.description !== editPiggyBank.description) {
        this.setState({
          isCancelUpdateModalOpen: true
        })
      } else {
        this.props.onClickExitIcon()
      }
    }
  }

  handleChangeTitle(e: React.ChangeEvent<HTMLInputElement>): void {
    this.props.onChangeTitle(e.target.value)
  }

  handleChangeDescription(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    this.props.onChangeDescription(e.target.value)
  }

  handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    const ENTER = 13
    if (e.keyCode === ENTER) {
      e.preventDefault()
      this.handleClickSubmitButton()
    }
  }

  handleClickSubmitButton(): void {
    this.props.onClickSubmitButton()
  }

  handleClickTrashIcon(): void {
    this.setState({
      isDestroyModalOpen: true
    })
  }

  handleClickCancelButton(): void {
    this.setState({
      isDestroyModalOpen: false
    })
    this.props.onClickTrashIcon()
  }

  handleClickCloseButton(): void {
    this.setState({
      isDestroyModalOpen: false,
      isCancelUpdateModalOpen: false
    })
  }

  handleClickEditCancelButton(): void {
    this.setState({
      isCancelUpdateModalOpen: false
    })
    this.props.onClickExitIcon()
  }

  render(): JSX.Element {
    return (
      <div className='piggy-bank-content-component'>
        {!this.props.piggyBankStore.isLoading && (
          <div>
            {this.props.piggyBankStore.piggyBank && (
              <div className='piggy-bank-field'>
                <Trash onClickIcon={this.handleClickTrashIcon} />
                {this.state.isDestroyModalOpen && (
                  <DestroyModal
                    isOpen={this.state.isDestroyModalOpen}
                    onClickCancel={this.handleClickCancelButton}
                    onClickClose={this.handleClickCloseButton}
                  />
                )}
                <EditAndCancel
                  editing={this.props.piggyBankStore.editing}
                  onClickExitIcon={this.handleClickExitIcon}
                  onClickEditIcon={this.handleClickEditIcon}
                />
                {this.state.isCancelUpdateModalOpen && (
                  <CancelUpdateModal
                    isOpen={this.state.isCancelUpdateModalOpen}
                    onClickCancel={this.handleClickEditCancelButton}
                    onClickClose={this.handleClickCloseButton}
                  />
                )}
                {this.props.piggyBankStore.editing ? (
                  <PiggyBankForm
                    piggyBankStore={this.props.editPiggyBankStore}
                    onChangeTitle={this.handleChangeTitle}
                    onChangeDescription={this.handleChangeDescription}
                    onClickSubmitButton={this.handleClickSubmitButton}
                    onKeyDown={this.handleKeyDown}
                  />
                ) : (
                  <span>
                    <span className='piggy-bank-title'>
                      {this.props.piggyBankStore.piggyBank.title}
                    </span>
                    <span className='piggy-bank-description'>
                      {this.props.piggyBankStore.piggyBank.description}
                    </span>
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

export default PiggyBankContentContainer
