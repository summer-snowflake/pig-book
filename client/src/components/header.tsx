import React, { Component} from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import TopPage from 'components/topPage';

class Header extends Component {
  render() {
    return (
      <Router>
        <header>
          <ul>
            <li><Link to='/'>HOME</Link></li>
            <li><Link to='/users/sign_in'>ログイン</Link></li>
          </ul>
        </header>

        <div>
          <Route path='/' exact component={TopPage} />
        </div>
      </Router>
    );
  }
}

export default Header;