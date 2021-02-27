import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import NewPiggyItemModalContainer from 'components/piggy/newPiggyItemModalContainer'

interface ParentProps {
  isOpen: boolean;
  onClickButton: () => void;
  onCloseModal: () => void;
}

type Props = ParentProps & I18nProps

class NewPiggyItemField extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleClickPlusButton = this.handleClickPlusButton.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  handleClickPlusButton(): void {
    this.props.onClickButton()
  }

  handleCloseModal(): void {
    this.props.onCloseModal()
  }

  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='new-piggy-item-form-component'>
        <button className='create-button-component btn btn-secondary' onClick={this.handleClickPlusButton}>
          <i className='fas fa-plus left-icon'></i>
          {t('button.addPiggyItem')}
        </button>
        <NewPiggyItemModalContainer isOpen={this.props.isOpen} onClose={this.handleCloseModal} />
      </div>
    )
  }
}

export default withTranslation()(NewPiggyItemField)
