import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  onClickExitIcon: () => void;
  onClickEditIcon: () => void;
  editing: boolean;
}

class EditAndCancel extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleClickIcon = this.handleClickIcon.bind(this)
  }

  handleClickIcon(): void {
    if (this.props.editing) {
      this.props.onClickExitIcon()
    } else {
      this.props.onClickEditIcon()
    }
  }

  render(): JSX.Element {
    return (
      <div className='edit-and-cancel-component icon-field float-right'>
        <span onClick={this.handleClickIcon}>
          {this.props.editing ? (
            <FontAwesomeIcon icon={['fas', 'times']} />
          ) : (
            <FontAwesomeIcon icon={['fas', 'edit']} />
          )}
        </span>
      </div>
    )
  }
}

export default EditAndCancel
