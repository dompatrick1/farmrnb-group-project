import "./UserProfile.css"
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getUserReservationsThunk, cancelReservationThunk } from "../../store/reservation"
import { useDispatch, useSelector } from 'react-redux'
import { getFarmsThunk } from '../../store/farm'
import userProfileImage from './userProfileBackground.jpg'

function UserProfile() {
  const { userId } = useParams();
  const dispatch = useDispatch()
  const userReservations = Object.values(useSelector(state => state.reservations))
  const farms = Object.values(useSelector(state => state.farms))
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(getFarmsThunk())
    dispatch(getUserReservationsThunk(userId))
    window.scrollTo(0, 0)
  }, [dispatch, userId])

  if (!sessionUser) {
    return null;
  }

  const handleDelete = async (e, id) => {
    e.preventDefault()
    await dispatch(cancelReservationThunk(id))
    dispatch(getUserReservationsThunk(userId))
  }

  return (
    <div className="parent-container">
      <ul className="user-info">
        <li>
          <strong>Username: {sessionUser.username} </strong>
        </li>
        <li>
          <strong>Email: {sessionUser.email}</strong>
        </li>
      </ul>

      <div className="userProfileVisitText">
        <h2>Your Upcoming Visits!</h2>
      </div>

      <div className="userProfileReservationContainer">

        {farms.length ? userReservations.map(reservation => {
          const options = { year: "numeric", month: "long", day: "numeric" }
          const start = new Date(reservation.startDate).toLocaleDateString(undefined, options)
          const end = new Date(reservation.endDate).toLocaleDateString(undefined, options)
          const farmId = reservation.farmId

          return (
            <div className="userProfileReservationDiv" key={reservation.id}>
              <Link to={`/farm/${reservation.farmId}`} className="reservationLink">
                <p>Starts on:   {start} at {farms[farmId - 1].name}</p>
                <p>Ends on:   {end}</p>
                <button onClick={(e) => handleDelete(e, reservation.id)}>Cancel Reservation</button>
              </Link>
            </div>
          )
        }) : null}
      </div>
      <div className="up-background-image-container">
        <img src={userProfileImage} className="up-background-image" alt="user profile"></img>
      </div>
    </div>
  );
}
export default UserProfile

// const farms =
// const farmId = reservation.farmId
// const farmName
