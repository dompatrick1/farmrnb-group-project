import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFarmReviewsThunk, editReviewThunk, deleteReviewThunk} from '../../store/review'

function SingleReview(props){
    console.log("PROPS", props)
    console.log("PROPSREVIEW", props.review.review)
    const {id} = useParams()
    console.log("ID------", id)
    const dispatch = useDispatch()
    const [editing, setEditing] = useState(false)
    const [errors, setErrors] = useState([])
    const [review, setReview] = useState(props.review.review)
    const [rating, setRating] = useState(props.review.rating)
    const sessionUser = useSelector(state => state.session.user)

    const handleDelete = async (e, review) => {
        e.preventDefault()
        await dispatch(deleteReviewThunk(props.review.id))
        dispatch(getFarmReviewsThunk(id))
    }

    const handleEdit = async (e) => {
        e.preventDefault()
        setEditing(true)
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

    let reviewBox = (
            <div>
                {props.review ?
                    <div>
                        <p>{props.review.review}</p>
                        <p>{props.review.rating}</p>
                    </div>
                : null}
                {sessionUser && props.review.userId === sessionUser.id ?
                    <div>
                        <button onClick={(e) => handleDelete(e, review)}>X</button>
                        <button onClick={(e) => handleEdit(e)}>Edit</button>
                    </div>
                : null}
            </div>
    )

    let editForm = (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, index) => <li key={index}>{error}</li>)}
            </ul>
            <input
                type="text"
                placeholder={props.review.review}
                required
                value={review}
                onChange={e => setReview(e.target.value)}
            />
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
