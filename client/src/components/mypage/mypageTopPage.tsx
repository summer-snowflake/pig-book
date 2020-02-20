import React, { Component } from 'react';

import MypageMenu from 'components/mypage/mypageMenu'
import MypageTop from 'components/mypage/mypageTop'

class MypageTopPage extends Component {
  render() {
    return (
      <div className="mypage-top-component container">
        <div className='row'>
          <div className='col-3 d-none d-lg-block'>
            <MypageMenu />
          </div>
          <div className='col-1 d-lg-none'>
          </div>
          <div className='col'>
            <MypageTop />
          </div>
        </div>
      </div>
    );
  }
}

export default MypageTopPage;
