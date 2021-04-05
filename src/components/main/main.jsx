import React, {useEffect, useState} from 'react';
import Header from "../header/header";
import OfferList from "../offer-list/offer-list";
import Map from "../map/map";
import CitiesList from "../cities-list/cities-list";
import {selectCity, fillOffers, selectSortOption} from '../../store/action';
import LoadingScreen from '../loading-screen/loading-screen';
import {fetchOfferList, setFavoriteOffer} from "../../store/api-actions";
import {useSelector, useDispatch} from 'react-redux';
import {getOffersByCity, getOffersCount} from "../../selectors";
import SortOptions from "../sort-options/sort-options";
import MainEmpty from "../main-empty/main-empty";
import {locations} from "../../const";

const Main = () => {
  const {city} = useSelector((state) => state.PROCESS);
  const {sortOption} = useSelector((state) => state.PROCESS);
  const {isDataLoaded} = useSelector((state) => state.DATA);
  const offersCount = useSelector((state) => getOffersCount(state));
  const offersFiltered = useSelector((state) => getOffersByCity(state));

  const [isExistenceOffers, setExistenceOffers] = useState(true);

  const dispatch = useDispatch();

  const onSelectCity = (selectedCity) => {
    dispatch(selectCity(selectedCity.name));
    dispatch(fillOffers(selectedCity.name));
  };

  const onSelectSortOptions = (optionSort) => {
    dispatch(selectSortOption(optionSort));
  };

  const handleFavoriteButtonClick = ({id, isFavorite}) => {
    const status = +!isFavorite;
    dispatch(setFavoriteOffer({id, status}))
      .then(() => dispatch(fetchOfferList()));
  };

  useEffect(() => {
    if (!isDataLoaded) {
      dispatch(fetchOfferList());
    }
  }, [isDataLoaded]);

  useEffect(() => {
    if (offersFiltered.length === 0) {
      setExistenceOffers(false);
    } else {
      setExistenceOffers(true);
    }
  }, [offersFiltered]);

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
          {isExistenceOffers ?
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
                    handleFavoriteButtonClick={handleFavoriteButtonClick}
                    isActiveItemNeeded={true}
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
            :
            <MainEmpty city={city.name}/>
          }
        </div>
      </main>
    </div>
  );
};

export default Main;
