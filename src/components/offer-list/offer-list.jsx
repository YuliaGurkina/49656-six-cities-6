import React, {useState} from 'react';
import PropTypes from 'prop-types';
import PlaceCard from "../place-card/place-card";

const OfferList = (props) => {
  const activeOffer = useState(0);
  const setActiveOffer = activeOffer[1];
  // const [activeOffer, setActiveOffer] = useState({});

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
        />
      )}
    </>
  );
};

OfferList.propTypes = {
  offers: PropTypes.array.isRequired,
  customCardClass: PropTypes.string,
  customCardImgClass: PropTypes.string,
  customCardInfoClass: PropTypes.string,
  widthImg: PropTypes.number,
  heightImg: PropTypes.number,
};

export default OfferList;
