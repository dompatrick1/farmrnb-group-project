//constraints


const GET_FARM_REVIEWS = "reviews/GET_FARM_REVIEWS"
const GET_USER_REVIEWS = "reviews/GET_USER_REVIEWS"
const CREATE_REVIEW = "reviews/CREATE_REVIEW"
const DELETE_REVIEW = "reviews/DELETE_REVIEW"
const EDIT_REVIEW = "reviews/EDIT_REVIEW"

const get_farm_reviews = (reviews) => ({
  type: GET_FARM_REVIEWS,
  payload: reviews
})

const get_user_reviews = (reviews) => ({
  type: GET_USER_REVIEWS,
  payload: reviews
})

const create_review = (review) => ({
  type: CREATE_REVIEW,
  payload: review
})

const delete_review = () => ({
  type: DELETE_REVIEW,
})

const editReview = (reviewEdit) => ({
  type: EDIT_REVIEW,
  payload: reviewEdit
})

// ****************** THUNKS ******************** //

export const getFarmReviewsThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/reviews/farm/${id}`)
  if (!response.ok) {
    throw response
  }

  const reviews = await response.json();
  dispatch(get_farm_reviews(reviews))
}

export const getUserReviewsThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${id}`)
  if (!response.ok) {
    throw response
  }

  const userReviews = await response.json();
  dispatch(get_user_reviews(userReviews))
}

export const createReviewThunk = (reviews) => async (dispatch) => {
  const { review, rating, userId, farmId } = reviews

  const response = await fetch(`/api/reviews/farm/${farmId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      review,
      rating,
      userId,
      farmId
    })
  })

  const newReview = await response.json()
  dispatch(create_review(newReview))
  return newReview
}

export const deleteReviewThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${id}/`, { method: "DELETE" })

  // const review = await response.json()
  dispatch(delete_review())
  return null;
}

export const editReviewThunk = (reviewData) => async (dispatch) => {
  const { id, review, rating, userId, farmId } = reviewData

  const response = await fetch(`/api/reviews/farm/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      review, rating, userId, farmId
    })
  })
  const reviewEdit = await response.json();
  dispatch(editReview(reviewEdit))
  return reviewEdit;
}

const initialState = {}

const reviewReducer = (reviews = initialState, action) => {
  let newReviews;
  let reviewsPayload;

  switch (action.type) {
    case GET_FARM_REVIEWS:
      reviewsPayload = action.payload
      newReviews = {};
      for (const review of reviewsPayload.reviews) {
        newReviews[review.id] = review
      }
      return newReviews;
    case GET_USER_REVIEWS:
      reviewsPayload = action.payload
      newReviews = {};
      for (const review of reviewsPayload.reviews) {
        newReviews[review.id] = review
      }
      return newReviews;
    case CREATE_REVIEW:
      return { ...reviews, [action.payload.id]: action.payload }
    case DELETE_REVIEW:
      return reviews
    case EDIT_REVIEW:
      return { ...reviews, [action.payload.id]: action.payload }

    default:
      return reviews
  }
}

export default reviewReducer

//REVIEWS FOR EACH FARM
//REVIEWS AUTHORED BY USER
