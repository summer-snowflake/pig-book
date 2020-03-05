import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  onClickIcon: () => void;
  editing: boolean;
}

class EditAndCancel extends Component<I18nProps & Props> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='edit-and-cancel-component icon-field float-right'>
        <span>
          {this.props.editing && (
            <span className='d-none d-lg-inline badge badge-info editing-badge'>
              <i className='fas fa-pen-square left-icon' />
              {t('title.editing')}
            </span>
          )}
          <span onClick={this.props.onClickIcon}>
            {this.props.editing ? (
              <FontAwesomeIcon icon={['fas', 'times']} />
            ) : (
              <FontAwesomeIcon icon={['fas', 'edit']} />
            )}
          </span>
        </span>
      </div>
    )
  }
}

export default withTranslation()(EditAndCancel)
