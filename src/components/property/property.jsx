import React, {useEffect} from 'react';
import Header from "../header/header";
import CommentForm from "../comment-form/comment-form";
import ReviewsList from "../reviews-list/reviews-list";
import {fetchCommentsList, fetchNearByOfferList, fetchOffer, setFavoriteOffer} from "../../store/api-actions";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import PropTypes from "prop-types";
import {getComments, getNearbyOffer, getOffer} from "../../selectors";
import Map from "../map/map";
import OfferList from "../offer-list/offer-list";
import NotFound from "../not-found/not-found";
import LoadingScreen from "../loading-screen/loading-screen";
import {OfferType} from "../../const";
import {selectOffer} from "../../store/action";

const Property = ({id}) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => getComments(state));
  const offer = useSelector((state) => getOffer(state));
  const nearbyOffers = useSelector((state) => getNearbyOffer(state));
  const {isDataOfferLoaded} = useSelector((state) => state.DATA);
  const pointsForMap = Object.assign([], nearbyOffers);
  pointsForMap[pointsForMap.length] = offer;
  const {pathname} = useLocation();

  const handleFavoriteButtonClick = (item) => {
    const status = +!item.isFavorite;
    dispatch(setFavoriteOffer({id: item.id, status}))
      .then(() => dispatch(fetchNearByOfferList({hotelId: offer.id})));
  };

  const handleCurrentOfferFavoriteButtonClick = (item) => {
    const status = +!item.isFavorite;
    dispatch(setFavoriteOffer({id: item.id, status}))
      .then(() => dispatch(fetchOffer(item.id)));
  };

  useEffect(() => {
    dispatch(fetchCommentsList({hotelId: id}));
  }, []);

  useEffect(() => {
    dispatch(fetchNearByOfferList({hotelId: id}));
  }, []);

  useEffect(() => {
    dispatch(fetchOffer(id));
  }, [id]);

  useEffect(() => {
    dispatch(selectOffer(offer));
  }, [offer]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (!isDataOfferLoaded) {
    return (
      <LoadingScreen />
    );
  }

  if (!offer.id) {
    return (
      <NotFound />
    );
  }
  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {offer.images && offer.images.slice(0, 6).map((srcImg, i) => {
                return (
                  <div className="property__image-wrapper" key={`image-${i}`}>
                    <img className="property__image" src={srcImg} alt="Photo studio"/>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {offer.isPremium &&
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              }
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {offer.title}
                </h1>
                <button
                  className={`property__bookmark-button ${offer.isFavorite ? `property__bookmark-button--active` : ``} button`}
                  type="button"
                  onClick={(evt) => {
                    evt.preventDefault();
                    handleCurrentOfferFavoriteButtonClick(offer);
                  }}
                >
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  {offer.rating &&
                    <span style={{width: `${Math.round(offer.rating) * 100 / 5}%`}}/>
                  }
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {OfferType[offer.type.toUpperCase()]}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {offer.goods && offer.goods.map((item, i) => {
                    return <li className="property__inside-item" key={`goods-${i}`}>{item}</li>;
                  })}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  {offer.host &&
                    <>
                      <div className={`property__avatar-wrapper ${offer.host.isPro ? `property__avatar-wrapper--pro` : ``} user__avatar-wrapper`}>
                        <img className="property__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                      </div>
                      <span className="property__user-name">
                        {offer.host.name}
                      </span>
                      {offer.host.isPro &&
                        <span className="property__user-status">
                          Pro
                        </span>
                      }
                    </>
                  }
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <ReviewsList countReviews={comments.length} comments={comments}>
                <CommentForm id={id}/>
              </ReviewsList>
            </div>
          </div>
          <section className="property__map map">
            <Map
              points={pointsForMap}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <OfferList
                offers={nearbyOffers}
                customCardClass='near-places__card'
                customCardImgClass='near-places__image-wrapper'
                onFavoriteButtonClick={handleFavoriteButtonClick}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

Property.propTypes = {
  id: PropTypes.string.isRequired
};

export default Property;
