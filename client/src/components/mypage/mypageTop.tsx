import React, { Component } from 'react'

import TutorialContainer from 'components/mypage/tutorialContainer'
import TotalAssetsContainer from 'components/mypage/totalAssetsContainer'

import 'stylesheets/mypage.sass'

class MypageTop extends Component {
  render(): JSX.Element {
    return (
      <div className='mypage-top-component container'>
        <TutorialContainer />
        <TotalAssetsContainer />
      </div>
    )
  }
}

export default MypageTop
