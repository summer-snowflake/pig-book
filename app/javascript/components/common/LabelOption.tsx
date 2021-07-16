import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

interface ParentProps {
  labelName: string;
}

type Props = ParentProps & I18nProps

class LabelOption extends Component<Props> {


  render(): JSX.Element {
    const { t } = this.props

    return (
      <option className='label-option-component'>
        {'- ' + t('label.' + this.props.labelName) +' -'}
      </option>
    )
  }
}

export default withTranslation()(LabelOption)
