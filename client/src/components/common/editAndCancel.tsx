import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  onClickIcon: () => void;
  editing: boolean;
}

class EditAndCancel extends Component<Props> {
  render(): JSX.Element {
    return (
      <div className='edit-and-cancel-component icon-field float-right'>
        <span onClick={this.props.onClickIcon}>
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
