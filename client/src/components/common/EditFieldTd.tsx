import React, { Component } from 'react'
import Modal from 'react-modal'

import { customModalStyles } from 'modules/modalStyles'
import Edit from 'components/common/edit'
import CloseButton from 'components/common/closeButton'
import PiggyItemForm from 'components/piggy/piggyItemForm'
import { PiggyItem } from 'types/api'

interface ParentProps {
  isOpenEditModal: boolean;
  piggyItem: PiggyItem;
  form: typeof PiggyItemForm;
  onClickEditIcon: (piggyItem: PiggyItem) => void;
  onClickCloseButton: () => void;
}

type Props = ParentProps

class EditFieldTd extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleClickCloseModal = this.handleClickCloseModal.bind(this)
    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
  }

  handleClickCloseModal(): void {
    this.props.onClickCloseButton()
  }

  handleClickEditIcon(): void {
    this.props.onClickEditIcon(this.props.piggyItem)
  }

  render(): JSX.Element {
    return (
      <td className='edit-field-td-component'>
        <Edit
          onClickIcon={this.handleClickEditIcon}
          tooltipDisable={true}
        />
        <div className='modal'>
          <div className='modal-dialog'>
            <Modal
              ariaHideApp={false}
              contentLabel="Example Modal"
              isOpen={this.props.isOpenEditModal}
              style={customModalStyles(40)}
            >
              <div className="modal-body">
                {this.props.form}
              </div>
              <div className='modal-footer'>
                <CloseButton onClickClose={this.handleClickCloseModal} />
              </div>
            </Modal>
          </div>
        </div>
      </td>
    )
  }
}

export default EditFieldTd
