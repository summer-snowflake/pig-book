import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'types/react-router'

import { PiggyBank } from 'types/api'
import { EditPiggyBankStore, NewPiggyBankStore, PiggyBanksStore, PiggyBankStore, ProfileStore } from 'types/store'
import { getPiggyBanks } from 'actions/piggyBanksActions'
import { getPiggyBank, patchPiggyBank, deletePiggyBank } from 'actions/piggyBankActions'
import {
  openNewPiggyBankModal,
  closeNewPiggyBankModal,
  openEditPiggyBankField,
  closeEditPiggyBankField,
  changeEditPiggyBankTitle,
  changeEditPiggyBankDescription
} from 'actions/piggyBankStoreActions'
import { RootState } from 'reducers/rootReducer'
import NewPiggyBankModalContainer from 'components/piggy/newPiggyBankModalContainer'
import PiggyBankListItem from 'components/piggy/piggyBankListItem'
import PiggyBankContent from 'components/piggy/piggyBankContent'

interface StateProps {
  profileStore: ProfileStore;
  piggyBanksStore: PiggyBanksStore;
  piggyBankStore: PiggyBankStore;
  newPiggyBankStore: NewPiggyBankStore;
  editPiggyBankStore: EditPiggyBankStore;
}

interface DispatchProps {
  openNewPiggyBankModal: (currency: string) => void;
  closeNewPiggyBankModal: () => void;
  openEditPiggyBankField: (piggyBank: PiggyBank) => void;
  closeEditPiggyBankField: () => void;
  getPiggyBanks: () => void;
  getPiggyBank: (piggyBankId: number) => void;
  patchPiggyBank: (id: number, piggyBank: PiggyBank) => void;
  deletePiggyBank: (id: number) => void;
  changeEditPiggyBankTitle: (title: string) => void;
  changeEditPiggyBankDescription: (description: string) => void;
}

type Props = RouteComponentProps & I18nProps & StateProps & DispatchProps

class PiggyBanksContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleClickCreateButton = this.handleClickCreateButton.bind(this)
    this.handleClickCloseModal = this.handleClickCloseModal.bind(this)
    this.handleClickPiggyBankTitle = this.handleClickPiggyBankTitle.bind(this)
    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
    this.handleClickExitIcon = this.handleClickExitIcon.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleChangeDescription = this.handleChangeDescription.bind(this)
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)

    this.props.getPiggyBanks()

    const pathRegex = this.props.location.pathname.match(/piggy_banks\/(\d+)/)
    if (pathRegex) {
      this.props.getPiggyBank(pathRegex[1])
    }
  }

  handleClickCreateButton(): void {
    this.props.openNewPiggyBankModal(this.props.profileStore.currency)
  }

  handleClickCloseModal(): void {
    this.props.closeNewPiggyBankModal()
  }

  handleClickPiggyBankTitle(targetId: number): void {
    this.props.getPiggyBank(targetId)
    this.props.history.push('/piggy_banks/' + targetId)
  }

  handleClickEditIcon(): void {
    if (this.props.piggyBankStore.piggyBank) {
      this.props.openEditPiggyBankField(this.props.piggyBankStore.piggyBank)
    }
  }

  handleClickExitIcon(): void {
    this.props.closeEditPiggyBankField()
  }

  handleClickSubmitButton(): void {
    const store = this.props.editPiggyBankStore
    const params = {
      id: store.id,
      title: store.title,
      description: store.description,
      currency: store.currency
    }
    this.props.patchPiggyBank(store.id, params)
  }

  handleChangeTitle(title: string): void {
    this.props.changeEditPiggyBankTitle(title)
  }

  handleChangeDescription(description: string): void {
    this.props.changeEditPiggyBankDescription(description)
  }

  handleClickTrashIcon(): void {
    if (this.props.piggyBankStore.piggyBank) {
      this.props.deletePiggyBank(this.props.piggyBankStore.piggyBank.id)
    }
    this.props.history.push('/piggy')
  }

  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='piggy-banks-component row'>
        <div className='col-3'>
          {this.props.piggyBanksStore.piggyBanks.length !== 0 &&(
            <ul className='piggy-bank-list'>
              {this.props.piggyBanksStore.piggyBanks.map((piggyBank: PiggyBank) => (
                <PiggyBankListItem key={piggyBank.id} piggyBank={piggyBank} onClickPiggyBankTitle={this.handleClickPiggyBankTitle} />
              ))}
            </ul>
          )}
          <button className='create-button-component btn btn-secondary' onClick={this.handleClickCreateButton}>
            <i className='fas fa-plus left-icon'></i>
            {t('button.addPiggyBank')}
          </button>
        </div>
        <div className='col'>
          <PiggyBankContent
            editPiggyBankStore={this.props.editPiggyBankStore}
            piggyBankStore={this.props.piggyBankStore}
            onClickEditIcon={this.handleClickEditIcon}
            onClickExitIcon={this.handleClickExitIcon}
            onClickSubmitButton={this.handleClickSubmitButton}
            onChangeTitle={this.handleChangeTitle}
            onChangeDescription={this.handleChangeDescription}
            onClickTrashIcon={this.handleClickTrashIcon}
          />
        </div>
        <NewPiggyBankModalContainer isOpen={this.props.newPiggyBankStore.isOpen} onClickClose={this.handleClickCloseModal} />
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    profileStore: state.profile,
    piggyBanksStore: state.piggyBanks,
    piggyBankStore: state.piggyBank,
    newPiggyBankStore: state.newPiggyBank,
    editPiggyBankStore: state.editPiggyBank
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    openNewPiggyBankModal(currency: string): void {
      dispatch(openNewPiggyBankModal(currency))
    },
    closeNewPiggyBankModal(): void {
      dispatch(closeNewPiggyBankModal())
    },
    openEditPiggyBankField(piggyBank: PiggyBank): void {
      dispatch(openEditPiggyBankField(piggyBank))
    },
    closeEditPiggyBankField(): void {
      dispatch(closeEditPiggyBankField())
    },
    getPiggyBanks(): void {
      dispatch(getPiggyBanks())
    },
    getPiggyBank(piggyBankId: number): void {
      dispatch(getPiggyBank(piggyBankId))
    },
    patchPiggyBank(id: number, piggyBank: PiggyBank): void {
      dispatch(patchPiggyBank(id, piggyBank)).then(() => {
        dispatch(getPiggyBanks())
      })
    },
    deletePiggyBank(id: number): void {
      dispatch(deletePiggyBank(id)).then(() => {
        dispatch(getPiggyBanks())
      })
    },
    changeEditPiggyBankTitle(title: string): void {
      dispatch(changeEditPiggyBankTitle(title))
    },
    changeEditPiggyBankDescription(description: string): void {
      dispatch(changeEditPiggyBankDescription(description))
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(withRouter(PiggyBanksContainer)))
