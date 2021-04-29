import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFarmReviewsThunk, editReviewThunk, deleteReviewThunk} from '../../store/review'

function SingleReview({props}){
    console.log("PROPS", props)
    const {id} = useParams()
    console.log("ID------", id)
    const dispatch = useDispatch()
    const [editing, setEditing] = useState(false)
    const [errors, setErrors] = useState([])
    const [review, setReview] = useState(props.review)
    const [rating, setRating] = useState(props.rating)
    const sessionUser = useSelector(state => state.session.user)

    const handleDelete = async (e, review) => {
        e.preventDefault()
        await dispatch(deleteReviewThunk(review.id))
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
            review,
            rating,
            userId: review.userId,
            farmId: review.farmId
        }

        await dispatch(editReviewThunk(payload))
            .catch(async (res) => {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)

            })
        
            setEditing(false)
    }
    
    let reviewBox = (
            <div>
                {review ?
                    <div>
                        <p>{review.review}</p>
                        <p>{review.rating}</p>
                    </div>
                : null}
                {sessionUser && review.userId === sessionUser.id ?
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
                placeholder={props.review}
                required
                value={review}
                onChange={e => setReview(e.target.value)}
            />
            <select
                onChange={e => setRating(e.target.value)}
                value={props.rating}
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
                {editForm}
            : {reviewBox}}
        </div>
    )

}

export default SingleReview