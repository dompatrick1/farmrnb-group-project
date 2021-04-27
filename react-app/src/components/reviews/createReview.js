import {createReviewThunk} from '../../store/review'
import { useDispatch, useSelector } from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
import React, {useEffect, useState} from 'react'

function CreateReviewForm () {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    let userId
    const {id} = useParams()
    const [review, setReview] = useState('')
    const [rating, setRating] = useState(5)
    const history = useHistory()

    const farmId = id
    console.log(farmId)
    console.log(sessionUser.id)

    if (sessionUser) {
        userId = sessionUser.id
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const payload = {
            review,
            rating,
            userId,
            farmId
        }
        console.log(payload)
        dispatch(createReviewThunk(payload))
        history.push(`/`)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Leave a review..."
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
        </>
    )

}

export default CreateReviewForm