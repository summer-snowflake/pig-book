import React, { Component } from 'react'
import Modal from 'react-modal'
import { withTranslation } from 'react-i18next'

import { Category } from 'types/api'
import { customModalStyles } from 'modules/modalStyles'
import Cancel from 'components/common/Cancel'
import CategoryCheckboxes from 'components/settings/place/CategoryCheckboxes'

interface Props extends I18nProps {
  categories: Category[];
  isOpen: boolean;
  placeId: number;
  onClickClose: () => void;
  onClickSubmit: (categoryIds: number[]) => void;
}

interface State {
  placeCategoryIds: number[];
  checkedCategoryIds: number[];
}

class CategorizedModal extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      placeCategoryIds: [],
      checkedCategoryIds: []
    }

    this.handleChangeChecking = this.handleChangeChecking.bind(this)
    this.handleClickSubmit = this.handleClickSubmit.bind(this)
  }

  diff(): boolean {
    return (this.state.checkedCategoryIds.every((c) => this.state.placeCategoryIds.includes(c))) &&
      (this.state.placeCategoryIds.every((c) => this.state.checkedCategoryIds.includes(c)))
  }

  handleChangeChecking(placeCategoryIds: number[], checkedCategoryIds: number[]): void {
    this.setState({
      placeCategoryIds: placeCategoryIds,
      checkedCategoryIds: checkedCategoryIds
    })
  }

  handleClickSubmit(): void {
    this.props.onClickSubmit(this.state.checkedCategoryIds)
  }

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
              style={customModalStyles(30, 600)}
            >
              <div className='modal-header'>
                <Cancel onClickIcon={this.props.onClickClose} />
              </div>
              <div className='modal-body'>
                <p>{t('message.placeCategorized')}</p>
                <CategoryCheckboxes
                  categories={this.props.categories}
                  onChangeChecking={this.handleChangeChecking}
                  placeId={this.props.placeId}
                />
              </div>
              <div className='modal-footer'>
                <button className='btn btn-primary' disabled={this.diff()} onClick={this.handleClickSubmit}>
                  {t('button.set')}
                </button>
              </div>
            </Modal>
          )}
        </div>
      </div>
    )
  }
}

export default withTranslation()(CategorizedModal)
