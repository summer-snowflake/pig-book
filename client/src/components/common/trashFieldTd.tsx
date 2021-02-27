import React, { Component } from 'react'

import Trash from 'components/common/trash'
import DestroyModal from 'components/common/destroyModal'

interface ParentProps {
  piggyItemId: number;
  onClickDestroyButton: (piggyItemId: number) => void;
}

type Props = ParentProps

interface State {
  isOpenDestroyModal: boolean;
}

class TrashFieldTd extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isOpenDestroyModal: false
    }

    this.handleClickDestroyButton = this.handleClickDestroyButton.bind(this)
    this.handleClickCloseDestroyModal = this.handleClickCloseDestroyModal.bind(this)
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
  }

  handleClickDestroyButton(): void {
    this.props.onClickDestroyButton(this.props.piggyItemId)
  }

  handleClickCloseDestroyModal(): void {
    this.setState({
      isOpenDestroyModal: false
    })
  }

  handleClickTrashIcon(): void {
    this.setState({
      isOpenDestroyModal: true
    })
  }

  render(): JSX.Element {
    return (
      <td className='trash-field-td-component trash-field-td'>
        <Trash
            onClickIcon={this.handleClickTrashIcon}
            tooltipDisable={true}
          />
        <DestroyModal
          isOpen={this.state.isOpenDestroyModal}
          onClickCancel={this.handleClickDestroyButton}
          onClickClose={this.handleClickCloseDestroyModal}
        />
      </td>
    )
  }
}

export default TrashFieldTd
