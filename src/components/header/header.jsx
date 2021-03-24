import React from 'react';
import {Link} from "react-router-dom";
import {AppRoute, AuthorizationStatus} from '../../const';
import {useSelector} from "react-redux";

const Header = () => {
  const {authorizationStatus} = useSelector((state) => state.USER);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to="/">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link
                  className="header__nav-link header__nav-link--profile"
                  to={authorizationStatus === AuthorizationStatus.AUTH ? `${AppRoute.FAVORITES}` : `${AppRoute.LOGIN}`}>
                  <div className="header__avatar-wrapper user__avatar-wrapper"/>
                  {authorizationStatus === AuthorizationStatus.AUTH ?
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    :
                    <span className="header__login">Sign in</span>
                  }
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
