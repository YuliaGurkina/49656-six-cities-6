import React from 'react';
import Review from "../review/review";
import PropTypes from "prop-types";
import {AuthorizationStatus, MAX_COUNT_REVIEW_DEFAULT} from "../../const";
import {useSelector} from "react-redux";

const ReviewsList = ({countReviews, comments, children, maxCountReviews = MAX_COUNT_REVIEW_DEFAULT}) => {
  const commentsSorted = comments.slice(0, maxCountReviews).sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  const {authorizationStatus} = useSelector((state) => state.USER);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{countReviews}</span></h2>
      <ul className="reviews__list">
        {commentsSorted.map((item, i) =>
          <Review
            key={`comment-${i}`}
            rating={item.rating}
            comment={item.comment}
            date={item.date}
            user={{name: item.user.name, avatarUrl: item.user.avatarUrl}}/>
        )}
      </ul>

      {(authorizationStatus === AuthorizationStatus.AUTH) &&
        children
      }
    </section>
  );
};

ReviewsList.propTypes = {
  countReviews: PropTypes.number.isRequired,
  maxCountReviews: PropTypes.number,
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
