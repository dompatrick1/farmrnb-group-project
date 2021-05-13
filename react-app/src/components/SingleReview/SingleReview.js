import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFarmReviewsThunk, editReviewThunk, deleteReviewThunk} from '../../store/review'
import "../reviews/reviews.css"

function SingleReview(props){
    const {id} = useParams()
    const dispatch = useDispatch()
    const [editing, setEditing] = useState(false)
    const [errors, setErrors] = useState([])
    const [review, setReview] = useState()
    const [rating, setRating] = useState()
    const sessionUser = useSelector(state => state.session.user)

    const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

let username;

    const handleDelete = async (e, review) => {
        e.preventDefault()
        await dispatch(deleteReviewThunk(props.review.id))
        dispatch(getFarmReviewsThunk(id))
    }

    const handleEdit = async (e) => {
        e.preventDefault()
        setEditing(true)
        setReview(props.review.review)
        setRating(props.review.rating)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setErrors([])

        const payload = {
            id: props.review.id,
            review,
            rating,
            userId: props.review.userId,
            farmId: props.review.farmId
        }

        dispatch(editReviewThunk(payload))
            // .catch(async (res) => {
            //     const data = await res.json()
            //     if (data && data.errors) setErrors(data.errors)

            // })

            setEditing(false)
    }
    let star = "⭐"
    let reviewBox = (
            <div className="singleReviewContainer">
                {props.review && username ?
                    <div>
                        <p className="reviewUserName">{username}</p>
                        <p className="reviewRating">Rating: {star.repeat(props.review.rating)}</p>
                        <p className="reviewReview">{props.review.review}</p>
                    </div>
                : null}
                {sessionUser && props.review.userId === sessionUser.id ?
                    <div>
                        <button className="deleteReview" onClick={(e) => handleDelete(e, review)}>X</button>
                        <button className="editReview" onClick={(e) => handleEdit(e)}>Edit</button>
                    </div>
                : null}
            </div>

    )

    let editForm = (
        <form className="reviewFormInputs" onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, index) => <li key={index}>{error}</li>)}
            </ul>
            <textarea
                type="text"
                placeholder={review}
                required
                value={review}
                onChange={e => setReview(e.target.value)}
            />
            <div>
                <label>Rate your stay out of 5:</label>
                    <select
                        onChange={e => setRating(e.target.value)}
                        value={rating}
                    >
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                    </select>
            </div>
            <button type='submit'>Submit</button>
        </form>
    )

    return (
        <div>
            {editing ?
                <div>
                    {editForm}
                </div>
            : <div>{reviewBox}</div>}
        </div>
    )

}

export default SingleReview
