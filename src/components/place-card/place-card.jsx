import React from 'react';
import PropTypes from 'prop-types';

const PlaceCard = (props) => {
  const {offer, handleMouseEnter, handleMouseLeave, customCardClass, customCardImgClass, customCardInfoClass, widthImg, heightImg} = props;
  const {price, title, type, previewImage} = offer;

  return (
    <article className={`${customCardClass} place-card`}
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => handleMouseLeave()}
    >
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      <div className={`${customCardImgClass} place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={previewImage} width={widthImg} height={heightImg} alt="Place image"/>
        </a>
      </div>
      <div className={`${customCardInfoClass} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `100%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  offer: PropTypes.shape({
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
  }).isRequired,
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  customCardClass: PropTypes.string,
  customCardImgClass: PropTypes.string,
  customCardInfoClass: PropTypes.string,
  widthImg: PropTypes.number,
  heightImg: PropTypes.number,
};

export default PlaceCard;
