import React from 'react';
import PropTypes from 'prop-types';
import PlaceCard from "../place-card/place-card";
import {Link} from "react-router-dom";
import Header from "../header/header";

const Main = (props) => {
  const cards = [
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5}
  ];

  const locations = [
    {name: `Paris`, id: 1},
    {name: `Cologne`, id: 2},
    {name: `Brussels`, id: 3},
    {name: `Amsterdam`, id: 4},
    {name: `Hamburg`, id: 5},
    {name: `Dusseldorf`, id: 6}
  ];

  return (
    <div className="page page--gray page--main">
      <Header/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {locations.map((item) => {
                return (
                  <li className="locations__item" key={item.id}>
                    <Link className="locations__item-link tabs__item" to="/">
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{props.offersCount} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex="0">
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
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
                {cards.map((card) =>
                  <PlaceCard key={card.id}/>
                )}
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  offersCount: PropTypes.number.isRequired,
};

export default Main;
