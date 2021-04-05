import React from 'react';
import PropTypes from 'prop-types';
import PlaceCard from "../place-card/place-card";
import offerProp from "../app/offer.prop";
import {useDispatch} from "react-redux";
import {selectOffer} from "../../store/action";

const OfferList = (props) => {
  const {onFavoriteButtonClick} = props;
  const dispatch = useDispatch();
  const setActiveOffer = (offer) => {
    dispatch(selectOffer(offer));
  };
  const {
    offers,
    customCardClass,
    customCardImgClass,
    customCardInfoClass,
    widthImg = 260,
    heightImg = 200,
    isActiveItemNeeded = false
  } = props;

  return (
    <>
      {offers.map((offer) =>
        <PlaceCard
          key={offer.id}
          offer={offer}
          customCardClass={customCardClass}
          customCardImgClass={customCardImgClass}
          customCardInfoClass={customCardInfoClass}
          widthImg={widthImg}
          heightImg={heightImg}
          handleMouseEnter={isActiveItemNeeded ? () => setActiveOffer(offer) : () => {}}
          handleMouseLeave={isActiveItemNeeded ? () => setActiveOffer({}) : () => {}}
          onClick={(evt) => {
            evt.preventDefault();
            onFavoriteButtonClick(offer);
          }}
        />
      )}
    </>
  );
};

OfferList.propTypes = {
  offers: PropTypes.arrayOf(offerProp).isRequired,
  customCardClass: PropTypes.string,
  customCardImgClass: PropTypes.string,
  customCardInfoClass: PropTypes.string,
  widthImg: PropTypes.number,
  heightImg: PropTypes.number,
  onFavoriteButtonClick: PropTypes.func.isRequired,
  isActiveItemNeeded: PropTypes.bool,
};

export default OfferList;
