import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Header from "../header/header";
import OfferList from "../offer-list/offer-list";
import offerProp from "../app/offer.prop";
import Map from "../map/map";
import CitiesList from "../cities-list/cities-list";
import {connect} from "react-redux";
import {ActionCreator} from '../../store/action';
import {getOffersByCity, getOffersCount} from "../../selectors";
import LoadingScreen from '../loading-screen/loading-screen';
import {fetchOfferList} from "../../store/api-actions";

const Main = (props) => {
  const {offersFiltered, city, onSelectCity, offersCount, isDataLoaded, onLoadData} = props;

  const locations = [
    {
      name: `Paris`,
      id: 1,
    },
    {
      name: `Cologne`,
      id: 2,
    },
    {
      name: `Brussels`,
      id: 3,
    },
    {
      name: `Amsterdam`,
      id: 4,
    },
    {
      name: `Hamburg`,
      id: 5,
    },
    {
      name: `Dusseldorf`,
      id: 6,
    }
  ];

  useEffect(() => {
    if (!isDataLoaded) {
      onLoadData();
    }
  }, [isDataLoaded]);

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <div className="page page--gray page--main">
      <Header/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList
          locations={locations}
          selectedCity={city.name}
          onSelect={onSelectCity}
        />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersCount} places to stay in {city.name}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex="0">
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"/>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex="0">Popular</li>
                  <li className="places__option" tabIndex="0">Price: low to high</li>
                  <li className="places__option" tabIndex="0">Price: high to low</li>
                  <li className="places__option" tabIndex="0">Top rated first</li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                <OfferList offers={offersFiltered} customCardClass='cities__place-card' customCardImgClass='cities__image-wrapper'/>
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  key={city.name}
                  points={offersFiltered}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  offersCount: PropTypes.number.isRequired,
  offersFiltered: PropTypes.arrayOf(offerProp).isRequired,
  city: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  onSelectCity: PropTypes.func.isRequired,
  isDataLoaded: PropTypes.bool.isRequired,
  onLoadData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.city,
  offersCount: getOffersCount(state),
  offersFiltered: getOffersByCity(state),
  isDataLoaded: state.isDataLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  onSelectCity(offers, city) {
    dispatch(ActionCreator.selectCity(city.name));
    dispatch(ActionCreator.fillOffers(city.name));
  },
  onLoadData() {
    dispatch(fetchOfferList());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
