import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import SideNav, { Toggle, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import 'stylesheets/header.sass';
import brandImage from 'images/pig.gif';
import { RouteComponentProps } from 'types/react-router';
import { getUserStatus } from 'actions/userStatusActions';

interface Props {
  getUserStatus: any,
  userStatus: {
    isLoading: boolean,
    isLogged: boolean
  }
}

class HeaderContainer extends Component<i18nProps & RouteComponentProps & Props> {
  constructor(props: i18nProps & RouteComponentProps & Props) {
    super(props);

    this.handleClickMenu = this.handleClickMenu.bind(this);

    this.props.getUserStatus();
  }

  handleClickMenu(arg: string) {
    this.props.history.push(arg);
  }

  render() {
    const { t } = this.props;

    return (
      <header className='header-component header'>
        <nav className='navbar navbar-expand-lg'>
          <NavLink className='nav-brand nav-link' to='/'>
            <img alt={t('brand_name')} className='brand-image' src={brandImage} />
            <span className='brand-name'>{t('brand_name')}</span>
          </NavLink>
          <SideNav className='navbar-toggler' onSelect={this.handleClickMenu}>
            <Toggle />
            <SideNav.Nav>
              <NavItem eventKey='/'>
                <NavIcon>
                  <i className='fas fa-home' />
                </NavIcon>
                <NavText>
                  {t('menu.home')}
                </NavText>
              </NavItem>
              {this.props.userStatus.isLogged && (
                <NavItem eventKey='/mypage'>
                  <NavIcon>
                    <i className='fas fa-user' />
                  </NavIcon>
                  <NavText>
                    {t('menu.mypage')}
                  </NavText>
                </NavItem>
              )}
              {!this.props.userStatus.isLogged && (
                <NavItem eventKey='/users/sign_in'>
                  <NavIcon>
                    <i className='fas fa-leaf' />
                  </NavIcon>
                  <NavText>
                    {t('menu.login')}
                  </NavText>
                </NavItem>
              )}
              {(this.props.location.pathname === '/users/sign_in' || this.props.location.pathname === '/users/sign_up') && !this.props.userStatus.isLogged && (
                <NavItem eventKey='/users/sign_up'>
                  <NavIcon>
                    <i className='fas fa-heart' />
                  </NavIcon>
                  <NavText>
                    {t('menu.signUp')}
                  </NavText>
                </NavItem>
              )}
            </SideNav.Nav>
          </SideNav>
          <div className='collapse navbar-collapse'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item'>
                <NavLink activeClassName='active-link-menu' className='nav-link' to='/'>
                  <i className='fas fa-home left-icon' />
                  {t('menu.home')}
                </NavLink>
              </li>
            </ul>
            <ul className='navbar-nav justify-content-end'>
              {this.props.userStatus.isLogged && (
                <li className='nav-item'>
                  <NavLink activeClassName='active-link-menu' className='nav-link' to='/mypage'>
                    <i className='fas fa-user left-icon' />
                    {t('menu.mypage')}
                  </NavLink>
                </li>
              )}
              {!this.props.userStatus.isLogged && (
                <li className='nav-item'>
                  <NavLink activeClassName='active-link-menu' className='nav-link' to='/users/sign_in'>
                    <i className='fas fa-leaf left-icon' />
                    {t('menu.login')}
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

function mapState(state: any) {
  return {
    userStatus: state.userStatus
  };
}

function mapDispatch(dispatch: any) {
  return {
    getUserStatus() {
      dispatch(getUserStatus());
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(withRouter(HeaderContainer)));