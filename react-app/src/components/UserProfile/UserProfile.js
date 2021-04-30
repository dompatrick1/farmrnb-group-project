import "./UserProfile.css"
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getUserReservationsThunk } from "../../store/reservation"
import { useDispatch, useSelector } from 'react-redux'

function UserProfile() {
  const { userId } = useParams();
  const dispatch = useDispatch()
  const [user, setUser] = useState({});
  const userReservations = Object.values(useSelector(state => state.reservations))
  const sessionUser = useSelector(state => state.session.user);
  console.log("sessionUser ===========", sessionUser);



  useEffect(() => {
    dispatch(getUserReservationsThunk(userId))
  }, [dispatch, userId])

  console.log("===========", userReservations)

  if (!user) {
    return null;
  }

  return (
    <div className="parentContainer">
      <ul>
        <li>
          <strong>Username: {sessionUser.username} </strong>
        </li>
        <li>
          <strong>Email: {sessionUser.email}</strong>
        </li>
      </ul>

      <div className="userReservationContainer">
        <p>Your upcoming visits!</p>
        {userReservations.map(reservation => {
          const options = { year: "numeric", month: "long", day: "numeric" }
          const start = new Date(reservation.startDate).toLocaleDateString(undefined, options)
          const end = new Date(reservation.endDate).toLocaleDateString(undefined, options)
          return (
            <Link to={`/farm/${reservation.farmId}`} key={reservation.id} className="reservationLink">
              <p>Starts on: {start}</p>
              <p>Ends on:{end}</p>
            </Link>
          )
        })}
      </div>
    </div>
  );
}
export default UserProfile
