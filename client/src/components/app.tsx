import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from "react-toastify";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import Header from 'components/headerContainer';
import TopPage from 'components/top/topPage';
import SignInPage from 'components/login/signInPage';
import SignUpPage from 'components/login/signUpPage';
import MypageTopPage from 'components/mypage/mypageTopPage';
import SettingsTopPage from 'components/settings/settingsTopPage';
import Footer from 'components/footer';
import Page404 from 'components/errors/page404';

import 'react-toastify/dist/ReactToastify.css';
import 'stylesheets/toastify.sass';

library.add(fab, fas, far);

class App extends Component {
  render() {
    return (
      <div className='app-component'>
        <Router>
          <ToastContainer />
          <Header />
          <Switch>
            <Route path='/' exact component={TopPage} />
            <Route path='/users/sign_in' exact component={SignInPage} />
            <Route path='/users/sign_up' exact component={SignUpPage} />
            <Route path='/mypage' exact component={MypageTopPage} />
            <Route path='/settings' exact component={SettingsTopPage} />
            <Route exact component={Page404} />
          </Switch>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
