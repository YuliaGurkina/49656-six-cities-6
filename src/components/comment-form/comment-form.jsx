import React, {useState} from 'react';
import {commentPost, fetchCommentsList} from "../../store/api-actions";
import {useDispatch} from "react-redux";
import PropTypes from "prop-types";
import {CountLettersReview} from "../../const";

const CommentForm = ({id}) => {
  const [commentForm, setCommentForm] = useState({
    rating: ``,
    review: ``,
  });
  const [isSubmitting, setSubmitting] = useState(false);
  const reviewForm = React.createRef();
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setSubmitting(true);
    dispatch(commentPost({
      id,
      comment: commentForm.review,
      rating: commentForm.rating,
    }))
      .then(() => {
        clearForm();
        setSubmitting(false);
      })
      .then(() => {
        dispatch(fetchCommentsList({hotelId: id}));
      });
  };

  const handleFieldChange = (evt) => {
    const {name, value} = evt.target;
    setCommentForm({...commentForm, [name]: value});
  };

  const clearForm = () => {
    setCommentForm({
      rating: ``,
      review: ``,
    });
  };

  const ratings = [5, 4, 3, 2, 1];

  return (
    <form className="reviews__form form" onSubmit={handleSubmit} ref={reviewForm}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">

        {ratings.map((value) => {
          return (
            <React.Fragment key={`rating-item-${value}`}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={value}
                id={`${value}-stars`}
                type="radio"
                onChange={handleFieldChange}
                disabled={isSubmitting}
                checked={!commentForm.rating ? false : (Number(commentForm.rating) === value)}
              />
              <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"/>
                </svg>
              </label>
            </React.Fragment>
          );
        })}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleFieldChange}
        value={commentForm.review}
        disabled={isSubmitting}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your
          stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={commentForm.review.length < CountLettersReview.MIN || commentForm.review.length > CountLettersReview.MAX || !commentForm.rating}>Submit</button>
      </div>
    </form>
  );
};

CommentForm.propTypes = {
  id: PropTypes.string.isRequired
};

export default CommentForm;
