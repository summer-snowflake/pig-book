import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import MypageMenu from 'components/mypage/MypageMenu'
import TotalAssetsCard from 'components/mypage/TotalAssetsCard'
import TutorialCard from 'components/mypage/TutorialCard'

type Props = I18nProps

class MyPage extends Component<Props> {
  render (): JSX.Element {
    const { t } = this.props

    return (
      <div className='my-page-component center-container'>
        <div className='row'>
          <div className='col-3'>
            <MypageMenu />
          </div>
          <div className='col'>
            <TutorialCard />
            <TotalAssetsCard />
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(MyPage)
