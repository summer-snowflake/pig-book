import React, { Component } from 'react'
import Modal from 'react-modal'
import { withTranslation } from 'react-i18next'

import { Category } from 'types/api'
import CloseButton from 'components/common/closeButton'
import CategoryCheckboxesContainer from 'components/settings/place/categoryCheckboxesContainer'

interface Props extends I18nProps {
  categories: Category[];
  isOpen: boolean;
  placeId: number;
  onClickClose: () => void;
}

const customStyles = {
  content : {
    top         : '30%',
    left        : '50%',
    right       : 'auto',
    bottom      : 'auto',
    marginRight : '-50%',
    maxWidth    : '600px',
    transform   : 'translate(-50%, -50%)'
  },
  overlay: {
    background  : 'rgba(0, 0, 0, .5)'
  }
}

class CategorizedModal extends Component<Props> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='modal categorized-modal-component'>
        <div className='modal-dialog'>
          {this.props.isOpen && (
            <Modal
              ariaHideApp={false}
              contentLabel='Categorized Modal'
              isOpen={this.props.isOpen}
              style={customStyles}
            >
              <div className='modal-body'>
                <p>{t('message.placeCategorized')}</p>
                <CategoryCheckboxesContainer
                  categories={this.props.categories}
                  placeId={this.props.placeId}
                />
              </div>
              <div className='modal-footer'>
                <CloseButton onClickClose={this.props.onClickClose} />
              </div>
            </Modal>
          )}
        </div>
      </div>
    )
  }
}

export default withTranslation()(CategorizedModal)
