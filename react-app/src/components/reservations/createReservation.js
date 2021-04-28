import {createReservationThunk} from '../../store/reservation'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

function CreateReservationForm() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    let userId
    const { id } = useParams()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
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
            userId,
            farmId,
            startDate,
            endDate
        }

        dispatch(createReservationThunk(payload))
        history.push(`/farm/${farmId}`)
    }

    let today = new Date().toLocaleDateString()

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="date"
                    value={startDate}
                    required
                    onChange={e => setStartDate(e.target.value)}
                />
                <input
                    type="date"
                    value={endDate}
                    required
                    onChange={e => setEndDate(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default CreateReservationForm
