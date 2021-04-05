import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import Header from "../header/header";
import OfferList from "../offer-list/offer-list";
import LoadingScreen from "../loading-screen/loading-screen";
import {getFavorite, getOffersGroupedByCity} from "../../selectors";
import {useDispatch, useSelector} from "react-redux";
import {fetchFavorite, setFavoriteOffer} from "../../store/api-actions";
import FavoritesEmpty from "../favorites-empty/favorites-empty";
import {AppRoute} from "../../const";
import {fillOffers, selectCity} from "../../store/action";

const Favorites = () => {
  const dispatch = useDispatch();
  const favorite = useSelector((state) => getFavorite(state));
  const {isDataFavoritesLoaded} = useSelector((state) => state.DATA);
  const favoriteGroupedByCity = useSelector((state) => getOffersGroupedByCity(state));


  const handleFavoriteButtonClick = (item) => {
    const status = +!item.isFavorite;
    dispatch(setFavoriteOffer({id: item.id, status}))
      .then(() => dispatch(fetchFavorite()));
  };

  useEffect(() => {
    dispatch(fetchFavorite());
  }, []);

  if (!isDataFavoritesLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <div className="page">
      <Header/>
      {favorite.length ?
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">{favorite ? `Saved listing` : `Nothing yet saved`}</h1>
              <ul className="favorites__list">
                {favoriteGroupedByCity && favoriteGroupedByCity.map((items) => {
                  if (!items.length) {
                    return false;
                  }
                  return (
                    <li className="favorites__locations-items" key={`locations-${items[0].city.name}`}>
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <Link
                            className="locations__item-link"
                            to={AppRoute.ROOT}
                            onClick={() => {
                              dispatch(selectCity(items[0].city.name));
                              dispatch(fillOffers(items[0].city.name));
                            }}
                          >
                            <span>{items[0].city.name}</span>
                          </Link>
                        </div>
                      </div>
                      <div className="favorites__places">
                        <OfferList
                          offers={items}
                          customCardClass='favorites__card'
                          customCardImgClass='favorites__image-wrapper'
                          customCardInfoClass='favorites__card-info'
                          widthImg={150}
                          heightImg={110}
                          onFavoriteButtonClick={handleFavoriteButtonClick}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>
        </main>
        :
        <FavoritesEmpty/>
      }
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>
    </div>
  );
};

export default Favorites;
