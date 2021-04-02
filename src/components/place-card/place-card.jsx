import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {OfferType} from "../../const";

const PlaceCard = (props) => {
  const {offer, handleMouseEnter, handleMouseLeave, customCardClass, customCardImgClass, customCardInfoClass, widthImg, heightImg, onClick} = props;
  const {price, title, type, previewImage, id, isPremium, rating} = offer;

  return (
    <article className={`${customCardClass} place-card`}
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => handleMouseLeave()}
    >
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className={`${customCardImgClass} place-card__image-wrapper`}>
        <Link to={`offer/${id}`}>
          <img className="place-card__image" src={previewImage} width={widthImg} height={heightImg} alt="Place image"/>
        </Link>
      </div>
      <div className={`${customCardInfoClass ? customCardInfoClass : ``} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${offer.isFavorite ? `place-card__bookmark-button--active` : ``} button`}
            type="button"
            onClick={onClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            {rating &&
            <span style={{width: `${Math.round(rating) * 100 / 5}%`}}/>
            }
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{OfferType[type.toUpperCase()]}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  offer: PropTypes.shape({
    price: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    isPremium: PropTypes.bool,
    isFavorite: PropTypes.bool,
  }).isRequired,
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  customCardClass: PropTypes.string,
  customCardImgClass: PropTypes.string,
  customCardInfoClass: PropTypes.string,
  widthImg: PropTypes.number,
  heightImg: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};

export default PlaceCard;
