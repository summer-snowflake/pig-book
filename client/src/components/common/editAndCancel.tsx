import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  handleClickIcon: any,
  editing: boolean
}

class EditAndCancel extends Component<i18nProps & Props> {
  render() {
    const { t } = this.props;

    return (
      <div className='edit-and-cancel-component icon-field float-right'>
        <span>
          {this.props.editing && (
            <span className='badge badge-info editing-badge'>
              <i className='fas fa-pen-square left-icon'></i>
              {t('title.editing')}
            </span>
          )}
          <span onClick={this.props.handleClickIcon}>
            {this.props.editing ? (
              <FontAwesomeIcon icon={['fas', 'times']} />
            ) : (
              <FontAwesomeIcon icon={['fas', 'edit']} />
            )}
          </span>
        </span>
      </div>
    );
  }
}

export default withTranslation()(EditAndCancel);
