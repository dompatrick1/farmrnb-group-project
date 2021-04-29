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
          <strong>User Id</strong> {userId}
        </li>
        <li>
          <strong>Username</strong> {user.username}
        </li>
        <li>
          <strong>Email</strong> {user.email}
        </li>
        <h2>Hiiiiiiiiiiiiiiiiiii</h2>
      </ul>

      {/* <div>
        {userReservations.map(reservation => {
          return (
            <Link to={`/farm/${farmId}`} key={reservation.id} className="reservationLink"/>
              <p>{reservation.startDate}</p>

          )
        }
      </div> */}
    </div>
  );
}
export default UserProfile
