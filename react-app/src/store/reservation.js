import { getFarmReviewsThunk } from "./review"

const GET_FARM_RESERVATIONS = "reservations/GET_FARM_RESERVATIONS"
const GET_USER_RESERVATIONS = "reservations/GET_USER_RESERVATIONS"
const CREATE_RESERVATION = "reservations/CREATE_RESERVATION"
const CANCEL_RESERVATION = "reservations/CANCEL_RESERVATION"
const EDIT_RESERVATION = "reservations/EDIT_RESERVATION"

const get_farm_reservations = (reservations) => ({
    type: GET_FARM_RESERVATIONS,
    payload: reservations
})

const get_user_reservations = (reservations) => ({
    type: GET_USER_RESERVATIONS,
    payload: reservations
})

const create_reservation = (reservation) => ({
    type: CREATE_RESERVATION,
    payload: reservation
})

const cancel_reservation = () => ({
    type: CANCEL_RESERVATION
})

const edit_reservation = (reservation) => ({
    type: EDIT_RESERVATION,
    payload: reservation
})

// ****************** THUNKS ******************** //

export const getFarmReservationsThunk = (id) => async dispatch => {
    const response = await fetch(`/api/reservations/${id}`)
    if (!response.ok) {
        throw response
    }

    const reservations = await response.json();
    dispatch(get_farm_reservations(reservations))
}

export const getUserReservationsThunk = (id) => async dispatch => {
    const response = await fetch(`/api/reservations/user/${id}`)
    if (!response.ok) {
        throw response
    }

    const userReservations = await response.json();
    dispatch(get_user_reservations(userReservations))
}

export const createReservationThunk = (reservation) => async dispatch => {
    const { userId, farmId, startDate, endDate } = reservation

    const response = await fetch(`/api/reservations/farm/${farmId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId,
            farmId,
            startDate,
            endDate
        })
    })
    const newReservation = await response.json();
    dispatch(create_reservation(newReservation))
    return newReservation
}

export const cancelReservationThunk = (id) => async dispatch => {
    const response = await fetch(`/api/reservations/${id}`, { method: "DELETE" })
    dispatch(cancel_reservation())
    return null
}

export const editReservationThunk = (editReservation) => async dispatch => {
    const { id, startDate, endDate } = editReservation

    const response = await fetch(`/api/reservations/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
            startDate, endDate
        })
    })
    const editReservation = await response.json();
    dispatch(edit_reservation(editReservation))
    return editReservation;
}

const initialState = {}

const reservationReducer = (reservations = initialState, action) => {
    let newReservations;
    let reservationsPayload;

    switch (action.type) {
        case GET_FARM_RESERVATIONS:
            reservationsPayload = action.payload
            newReservations = {}
            for (const reservation of reservationsPayload.reservations) {
                newReservations[reservation.id] = reservation
            }
            return newReservations;
        case GET_USER_RESERVATIONS:
            reservationsPayload = action.payload
            newReservations = {};
            for (const reservation of reservationsPayload.reservations) {
                newReservations[reservation.id] = reservation
            }
            return newReservations;
        case CREATE_RESERVATION:
            return { ...reservations, [action.payload.id]: action.payload }
        case CANCEL_RESERVATION:
            return reservations;
        case EDIT_RESERVATION:
            return { ...reservations, [action.payload.id]: action.payload }
        default:
            return reservations;
    }
}

export default reservationReducer
