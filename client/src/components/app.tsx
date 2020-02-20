import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from 'components/headerContainer';
import TopPage from 'components/top/topPage';
import SignInPage from 'components/login/signInPage';
import SignUpPage from 'components/login/signUpPage';
import Footer from 'components/footer';
import Page404 from 'components/errors/Page404';

class App extends Component {
  render() {
    return (
      <div className='app-component'>
        <Router>
          <Header />
          <Switch>
            <Route path='/' exact component={TopPage} />
            <Route path='/users/sign_in' exact component={SignInPage} />
            <Route path='/users/sign_up' exact component={SignUpPage} />
            <Route exact component={Page404} />
          </Switch>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
