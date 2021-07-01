import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

interface ParentProps {
  onClickClose: () => void;
}

type Props = ParentProps & I18nProps

class CloseButton extends Component<Props> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <button className='close-button-component btn btn-light' onClick={this.props.onClickClose}>
        <i className='fas fa-times' />
      </button>
    )
  }
}

export default withTranslation()(CloseButton)
