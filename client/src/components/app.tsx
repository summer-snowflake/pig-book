import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from 'components/headerContainer';
import TopPage from 'components/top/topPage';
import LoginPage from 'components/login/loginPage';
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
            <Route path='/users/sign_in' exact component={LoginPage} />
            <Route path='/users/sign_up' exact component={LoginPage} />
            <Route exact component={Page404} />
          </Switch>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
