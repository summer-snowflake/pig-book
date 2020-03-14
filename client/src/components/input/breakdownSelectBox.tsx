import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import { Breakdown } from 'types/api'

interface Props extends I18nProps {
  breakdowns: Breakdown[];
}

class BreakdownSelectBox extends Component<Props> {
  render(): JSX.Element {
    return (
      <div className='breakdown-select-box-component' />
    )
  }
}

export default withTranslation()(BreakdownSelectBox)
