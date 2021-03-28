import React from 'react';
import PropTypes from "prop-types";

const Review = ({comment, user, date, rating}) => {
  const widthRating = rating * 100 / 5;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            {widthRating &&
              <span style={{width: `${widthRating}%`}}/>
            }
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime="2019-04-24">{date.getMonth} {date.getFullYear}</time>
      </div>
    </li>
  );
};

Review.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    avatarUrl: PropTypes.string
  }).isRequired,
  comment: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

export default Review;
