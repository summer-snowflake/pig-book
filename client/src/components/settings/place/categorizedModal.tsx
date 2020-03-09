import React, { Component } from 'react'
import Modal from 'react-modal'
import { withTranslation } from 'react-i18next'

import { Category } from 'types/api'
import CloseButton from 'components/common/closeButton'
import CategoryName from '../category/categoryName'

interface Props extends I18nProps {
  categories: Category[];
  isOpen: boolean;
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
                <div>
                  {this.props.categories.map((category) => (
                    <span key={category.id}>
                      <input className='checkbox-input' id={'category-' + category.id} type='checkbox' />
                      <label className='checkbox-label' htmlFor={'category-' + category.id}>
                        <i className='fas fa-check left-icon' />
                        <CategoryName category={category} />
                      </label>
                    </span>
                  ))}
                </div>
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
