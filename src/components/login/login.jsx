import React, {useEffect, useRef, useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../store/api-actions";
import {toast} from "react-toastify";
import {AppRoute, AuthorizationStatus, DEFAULT_CITY_FROM_LOGIN} from "../../const";
import {fillOffers, selectCity} from "../../store/action";

const Login = () => {
  const loginRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const [validEmail, setValidEmail] = useState(true);
  const notify = () => toast(`Incorrect Email`);
  const notifyPassword = () => toast(`Password can't be empty`);

  const handleBlur = () => {
    if (loginRef.current.value === ``) {
      setValidEmail(false);
    }
    const RE = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    setValidEmail(RE.test(loginRef.current.value));
  };
  const handleFocus = () => {
    setValidEmail(true);
  };

  useEffect(() => {
    if (!validEmail) {
      notify();
    }
  }, [validEmail]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (loginRef.current.value === `` || passwordRef.current.value === ``) {
      if (loginRef.current.value === ``) {
        setValidEmail(false);
      }

      if (passwordRef.current.value === ``) {
        notifyPassword();
      }

      return false;
    }
    dispatch(login({
      login: loginRef.current.value,
      password: passwordRef.current.value,
    }));
    return true;
  };

  const {authorizationStatus} = useSelector(
      (state) => {
        return state.USER;
      });

  if (authorizationStatus === AuthorizationStatus.AUTH) {
    return <Redirect to={AppRoute.ROOT} />;
  }

  return (
    <div className="page page--gray page--login">
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
                  <Link to={AppRoute.LOGIN} className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action=""
              onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required=""
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required=""
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to={AppRoute.ROOT}
                onClick={() => {
                  dispatch(selectCity(DEFAULT_CITY_FROM_LOGIN));
                  dispatch(fillOffers(DEFAULT_CITY_FROM_LOGIN));
                }}
              >
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Login;
