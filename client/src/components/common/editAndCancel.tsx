
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  handleClickIcon: any,
  editing: boolean
}

class EditAndCancel extends Component<Props> {
  render() {
    return (
      <div className='edit-and-cancel-component icon-field float-right' onClick={this.props.handleClickIcon}>
        {this.props.editing ? (
          <FontAwesomeIcon icon={['fas', 'times']} />
        ) : (
          <FontAwesomeIcon icon={['fas', 'edit']} />
        )}
      </div>
    );
  }
}

export default EditAndCancel;