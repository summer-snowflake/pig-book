import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from 'components/header';
import TopPage from 'components/top/topPage';
import LoginPage from 'components/login/loginPage';
import Footer from 'components/footer';

class App extends Component {
  render() {
    return (
      <div className='app-component'>
        <Router>
          <Header />
          <Route path='/' exact component={TopPage} />
          <Route path='/users/sign_in' exact component={LoginPage} />
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
