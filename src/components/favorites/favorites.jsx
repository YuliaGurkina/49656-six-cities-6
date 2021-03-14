import React from 'react';
import {Link} from "react-router-dom";
import Header from "../header/header";
import OfferList from "../offer-list/offer-list";
import PropTypes from "prop-types";
import offerProp from "../app/offer.prop";
import {getOffersByCity, getOffersCount} from "../../selectors";
import {selectCity, fillOffers} from "../../store/action";
import {connect} from "react-redux";
import {getCity} from "../../store/app-process/selectors";

const Favorites = (props) => {
  const {offersFiltered} = props;

  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  <OfferList
                    offers={offersFiltered}
                    customCardClass='favorites__card'
                    customCardImgClass='favorites__image-wrapper'
                    customCardInfoClass='favorites__card-info'
                    widthImg={150}
                    heightImg={110}
                  />
                </div>
              </li>

              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Cologne</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  <OfferList
                    offers={offersFiltered}
                    customCardClass='favorites__card'
                    customCardImgClass='favorites__image-wrapper'
                    customCardInfoClass='favorites__card-info'
                    widthImg={150}
                    heightImg={110}
                  />
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>
    </div>
  );
};

Favorites.propTypes = {
  offersFiltered: PropTypes.arrayOf(offerProp).isRequired,
};
const mapStateToProps = (state) => ({
  city: getCity(state),
  offersCount: getOffersCount(state),
  offersFiltered: getOffersByCity(state)
});

const mapDispatchToProps = (dispatch) => ({
  onSelectCity(offers, city) {
    dispatch(selectCity(city.name));
    dispatch(fillOffers(city.name));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
