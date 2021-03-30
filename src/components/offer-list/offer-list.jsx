import React from 'react';
import PropTypes from 'prop-types';
import PlaceCard from "../place-card/place-card";
import offerProp from "../app/offer.prop";
import {useDispatch} from "react-redux";
import {selectOffer} from "../../store/action";
import {setFavoriteOffer} from "../../store/api-actions";

const OfferList = (props) => {
  const dispatch = useDispatch();
  const setActiveOffer = (offer) => {
    dispatch(selectOffer(offer));
  };
  const handleFavoriteButtonClick = ({id, isFavorite}) => {
    const status = +!isFavorite;
    dispatch(setFavoriteOffer({id, status}));
  };
  const {offers, customCardClass, customCardImgClass, customCardInfoClass, widthImg = 260, heightImg = 200} = props;

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
          handleMouseEnter={() => setActiveOffer(offer)}
          handleMouseLeave={() => setActiveOffer({})}
          onClick={(evt) => {
            evt.preventDefault();
            handleFavoriteButtonClick(offer);
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
};

export default OfferList;
