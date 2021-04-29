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
          <strong>Username {user.username} </strong> {user.username}
        </li>
        <li>
          <strong>Email</strong> {user.email}
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
              <p>{start}</p>
              <p>{end}</p>
            </Link>
          )
        })}
      </div>
    </div>
  );
}
export default UserProfile
