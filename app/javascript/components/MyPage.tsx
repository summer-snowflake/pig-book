import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'


type Props = I18nProps

class MyPage extends Component<Props> {
  render (): JSX.Element {
    const { t } = this.props

    return (
      <div className='my-page-component center-container'>
      </div>
    );
  }
}

export default withTranslation()(MyPage)
