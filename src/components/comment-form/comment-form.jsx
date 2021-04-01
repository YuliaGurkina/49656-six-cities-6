import React, {useState} from 'react';
import {commentPost} from "../../store/api-actions";
import {useDispatch} from "react-redux";
import PropTypes from "prop-types";

const CommentForm = ({id}) => {
  const [commentForm, setCommentForm] = useState({
    rating: ``,
    review: ``,
  });
  const [statusSubmitButton, setStatusSubmitButton] = useState(0);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    blockForm(0);
    setStatusSubmitButton(0);
    dispatch(commentPost({
      id,
      comment: commentForm.review,
      rating: commentForm.rating,
    })).then(()=>{
      clearForm();
      blockForm(1);
    });
  };

  const handleFieldChange = (evt) => {
    const {name, value} = evt.target;
    setCommentForm({...commentForm, [name]: value});
    checkStatusSubmitButton();
  };

  const checkStatusSubmitButton = () => {
    if (commentForm.rating && commentForm.review.length > 50 && commentForm.review.length < 300) {
      setStatusSubmitButton(1);
    } else {
      setStatusSubmitButton(0);
    }
  };

  const blockForm = (statusForm) => {
    const form = document.querySelector(`.reviews__form`);
    for (let i = 0, len = form.elements.length; i < len; ++i) {
      form.elements[i].readOnly = !statusForm;
    }
  };

  const clearForm = () => {
    setCommentForm({
      rating: ``,
      review: ``,
    });

    const review = document.getElementById(`review`);
    const ratingInputs = document.getElementsByClassName(`form__rating-input`);
    for (let i = 0, len = ratingInputs.length; i < len; ++i) {
      ratingInputs[i].checked = false;
    }
    review.value = ``;
  };

  const ratings = [5, 4, 3, 2, 1];

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
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
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your
          stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!statusSubmitButton ? `disabled` : ``}>Submit</button>
      </div>
    </form>
  );
};

CommentForm.propTypes = {
  id: PropTypes.string.isRequired
};

export default CommentForm;
