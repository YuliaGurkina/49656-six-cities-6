import React, {useEffect} from 'react';
import Header from "../header/header";
import CommentForm from "../comment-form/comment-form";
import ReviewsList from "../reviews-list/reviews-list";
import {fetchCommentsList, fetchOffer, setFavoriteOffer} from "../../store/api-actions";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import {getComments, getOffer} from "../../selectors";
import Map from "../map/map";
import OfferList from "../offer-list/offer-list";
import NotFound from "../not-found/not-found";
import LoadingScreen from "../loading-screen/loading-screen";
import {AuthorizationStatus} from "../../const";

const Property = ({id}) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => getComments(state));
  const offer = useSelector((state) => getOffer(state));
  const {isDataOfferLoaded} = useSelector((state) => state.DATA);
  const {authorizationStatus} = useSelector(
      (state) => {
        return state.USER;
      });
  const handleFavoriteButtonClick = (item) => {
    const status = +!item.isFavorite;
    dispatch(setFavoriteOffer({id: item.id, status}));
  };

  const OfferType =
    {
      room: `Room`,
      apartment: `Apartment`,
      hotel: `Hotel`,
      house: `House`
    };

  const mockOffers = [
    {
      "bedrooms": 3,
      "city": {
        "location": {
          "latitude": 52.370216,
          "longitude": 4.895168,
          "zoom": 10
        },
        "name": `Amsterdam`
      },
      "description": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
      "goods": [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
      "host": {
        "avatar_url": `img/1.png`,
        "id": 3,
        "is_pro": true,
        "name": `Angelina`
      },
      "id": 1,
      "images": [`img/1.png`, `img/2.png`],
      "isFavorite": false,
      "isPremium": false,
      "location": {
        "latitude": 52.35514938496378,
        "longitude": 4.673877537499948,
        "zoom": 8
      },
      "max_adults": 4,
      "previewImage": `img/apartment-03.jpg`,
      "price": 120,
      "rating": 4.8,
      "title": `Beautiful & luxurious studio at great location`,
      "type": `apartment`
    },
    {
      "bedrooms": 1,
      "city": {
        "location": {
          "latitude": 57.370216,
          "longitude": 6.895168,
          "zoom": 10
        },
        "name": `Amsterdam`
      },
      "description": `A quiet cozy and picturesque`,
      "goods": [`Heating`, `Kitchen`, `Cable TV`, `Dishwasher`],
      "host": {
        "avatar_url": `img/1.png`,
        "id": 21,
        "is_pro": true,
        "name": `Judi`
      },
      "id": 2,
      "images": [`img/1.png`, `img/2.png`],
      "isFavorite": true,
      "isPremium": false,
      "location": {
        "latitude": 52.35414938496378,
        "longitude": 4.673877537499948,
        "zoom": 8
      },
      "max_adults": 2,
      "previewImage": `img/apartment-01.jpg`,
      "price": 120,
      "rating": 4.8,
      "title": `Beautiful & luxurious studio at great location`,
      "type": `apartment`
    },
    {
      "bedrooms": 2,
      "city": {
        "location": {
          "latitude": 52.370216,
          "longitude": 4.895168,
          "zoom": 10
        },
        "name": `Amsterdam`
      },
      "description": `A quiet cozy river by the unique lightness of Amsterdam.`,
      "goods": [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
      "host": {
        "avatar_url": `img/1.png`,
        "id": 22,
        "is_pro": true,
        "name": `Mike`
      },
      "id": 3,
      "images": [`img/1.png`, `img/2.png`],
      "isFavorite": false,
      "isPremium": true,
      "location": {
        "latitude": 52.35314938496378,
        "longitude": 4.653877537499948,
        "zoom": 8
      },
      "max_adults": 3,
      "previewImage": `img/apartment-02.jpg`,
      "price": 120,
      "rating": 4.8,
      "title": `Beautiful & luxurious studio at great location`,
      "type": `apartment`
    },
  ];

  useEffect(() => {
    dispatch(fetchCommentsList({hotelId: id}));
  }, []);

  useEffect(() => {
    dispatch(fetchOffer(id));
  }, []);

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
              {offer.images && offer.images.map((srcImg, i) => {
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
                    handleFavoriteButtonClick(offer);
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
                    <span style={{width: `${offer.rating * 100 / 5}%`}}/>
                  }
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {OfferType[offer.type]}
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
                      <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                        <img className="property__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                      </div>
                      <span className="property__user-name">
                        {offer.host.name}
                      </span>
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
                {(authorizationStatus === AuthorizationStatus.AUTH) &&
                  <CommentForm id={id}/>
                }
              </ReviewsList>
            </div>
          </div>
          <section className="property__map map">
            <Map
              points={mockOffers}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <OfferList offers={mockOffers} customCardClass='near-places__card' customCardImgClass='near-places__image-wrapper'/>
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
