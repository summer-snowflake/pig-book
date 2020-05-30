import React, { Component } from 'react'

import MypageMenu from 'components/mypage/mypageMenu'
import MypageTop from 'components/mypage/mypageTop'

class MypageTopPage extends Component {
  render(): JSX.Element {
    return (
      <div className='mypage-top-page-component container'>
        <div className='row'>
          <div className='col-3 d-none d-lg-block'>
            <MypageMenu />
          </div>
          <div className='col-1 d-lg-none' />
          <div className='col'>
            <MypageTop />
          </div>
        </div>
      </div>
    )
  }
}

export default MypageTopPage
