import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import Header from 'components/header';
import TopPage from 'components/top/topPage';
import LoginPage from 'components/login/loginPage';
import Footer from 'components/footer';

interface i18nProps {
  t: any
}

class App extends Component<i18nProps> {
  constructor(props: i18nProps) {
    super(props);
  }

  render() {
    return (
      <div className='app-component'>
        <Router>
          <Header />
          <Switch>
            <Route path='/' exact component={TopPage} />
            <Route path='/users/sign_in' component={LoginPage} />
          </Switch>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default withTranslation()(App);
