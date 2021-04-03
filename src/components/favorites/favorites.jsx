import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import Header from "../header/header";
import OfferList from "../offer-list/offer-list";
import LoadingScreen from "../loading-screen/loading-screen";
import {getFavorite} from "../../selectors";
import {useDispatch, useSelector} from "react-redux";
import {fetchFavorite, setFavoriteOffer} from "../../store/api-actions";
import FavoritesEmpty from "../favorites-empty/favorites-empty";
import {Locations} from "../../const";

const Favorites = () => {
  const dispatch = useDispatch();
  const favorite = useSelector((state) => getFavorite(state));
  const {isDataFavoritesLoaded} = useSelector((state) => state.DATA);
  let offersByCity = [];
  if (favorite.length) {
    Locations.forEach((location) => {
      offersByCity[location.id] = favorite.filter((item) => item.city.name === location.name);
    });
  }

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
                {offersByCity && offersByCity.map((items, i) => {
                  if (!items.length) {
                    return false;
                  }
                  return (
                    <li className="favorites__locations-items" key={`locations-${i}`}>
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#">
                            <span>{items[0].city.name}</span>
                          </a>
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
                          handleFavoriteButtonClick={handleFavoriteButtonClick}
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
