import { createReviewThunk } from '../../store/review'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

function CreateReviewForm() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    let userId
    const { id } = useParams()
    const [review, setReview] = useState('')
    const [rating, setRating] = useState(5)
    const [errors, setErrors] = useState([])
    const history = useHistory()
    const farmId = parseInt(id)

    if (sessionUser) {
        userId = sessionUser.id
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setErrors([])

        const payload = {
            review,
            rating,
            userId,
            farmId
        }
        setReview('')
        dispatch(createReviewThunk(payload))
            .catch(async (res) => {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)

            })
        // history.push(`/farm/${farmId}`)
    }

    return (
        <>
            <form className="reviewFormInputs" onSubmit={handleSubmit}>
                <h2>Review Your Stay</h2>
                <ul>
                    {errors.map((error, index) => <li key={index}>{error}</li>)}
                </ul>
                <textarea
                    type="text"
                    placeholder="Leave a review..."
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
                {sessionUser ?
                    <button type='submit'>Submit</button>
                : <p>Login to leave a review</p>}
            </form>
        </>
    )

}

export default CreateReviewForm
