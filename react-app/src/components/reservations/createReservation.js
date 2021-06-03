import {createReservationThunk } from '../../store/reservation'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import React, { useState } from 'react'
import "../FarmPage/FarmPage.css"

function CreateReservationForm() {
    const dispatch = useDispatch()
    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user);

    let userId
    const { id } = useParams()

    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [errors, setErrors] = useState([])

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

        setStartDate("")
        setEndDate("")
        dispatch(createReservationThunk(payload))
        window.alert('Reservation successfully made.')
        history.push(`/farm/${farmId}`)
    }

    return (
        <div className="reservationForm">
            <form onSubmit={handleSubmit}>
                <div className="farmPageReservationContainer">
                    <ul>
                        {errors.map((error, index) => <li key={index}>{error}</li>)}
                    </ul>
                    <h2>Reserve Your Stay</h2>
                    <label>Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        required
                        onChange={e => setStartDate(e.target.value)}
                    />
                    <label>End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        required
                        onChange={e => setEndDate(e.target.value)}
                    />
                    {sessionUser ?
                        <button type="submit">Submit</button>
                    : <p>Login to reserve a stay</p>}
                </div>
            </form>
        </div>
    )
}

export default CreateReservationForm
