import React from 'react';
import Review from "../review/review";
import PropTypes from "prop-types";

const ReviewsList = ({countReviews, comments, children}) => {
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{countReviews}</span></h2>
      <ul className="reviews__list">
        {comments.map((item, i) =>
          <Review
            key={`comment-${i}`}
            rating={item.rating}
            comment={item.comment}
            date={item.date}
            user={{name: item.user.name, avatarUrl: item.user.avatarUrl}}/>
        )}
      </ul>
      {children}
    </section>
  );
};

ReviewsList.propTypes = {
  countReviews: PropTypes.number.isRequired,
  children: PropTypes.element,
  comments: PropTypes.arrayOf(PropTypes.shape({
    rating: PropTypes.number,
    comment: PropTypes.string,
    date: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
      avatarUrl: PropTypes.string,
    }),
  })).isRequired,
};

export default ReviewsList;
