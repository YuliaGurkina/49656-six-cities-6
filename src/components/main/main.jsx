import React, {useEffect} from 'react';
import Header from "../header/header";
import OfferList from "../offer-list/offer-list";
import Map from "../map/map";
import CitiesList from "../cities-list/cities-list";
import {selectCity, fillOffers, selectSortOption} from '../../store/action';
import LoadingScreen from '../loading-screen/loading-screen';
import {fetchOfferList} from "../../store/api-actions";
import {useSelector, useDispatch} from 'react-redux';
import {getOffersByCity, getOffersCount} from "../../selectors";
import SortOptions from "../sort-options/sort-options";

const Main = () => {
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
  const {city} = useSelector((state) => state.PROCESS);
  const {sortOption} = useSelector((state) => state.PROCESS);
  const {isDataLoaded} = useSelector((state) => state.DATA);
  const offersCount = useSelector((state) => getOffersCount(state));
  const offersFiltered = useSelector((state) => getOffersByCity(state));

  const dispatch = useDispatch();

  const onSelectCity = (selectedCity) => {
    dispatch(selectCity(selectedCity.name));
    dispatch(fillOffers(selectedCity.name));
  };

  const onSelectSortOptions = (optionSort) => {
    dispatch(selectSortOption(optionSort));
  };

  useEffect(() => {
    if (!isDataLoaded) {
      dispatch(fetchOfferList());
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
          selectedCity={city}
          onSelect={onSelectCity}
        />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersCount} places to stay in {city.name}</b>
              <SortOptions
                onSelect={onSelectSortOptions}
                sortOption={sortOption}
              />
              <div className="cities__places-list places__list tabs__content">
                <OfferList
                  offers={offersFiltered}
                  customCardClass='cities__place-card'
                  customCardImgClass='cities__image-wrapper'
                />
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

export default Main;
