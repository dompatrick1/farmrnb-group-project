import "./UserProfile.css"
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserReservationsThunk } from "../../store/reservation"
import { useDispatch } from 'react-redux'

function UserProfile() {
  const { userId } = useParams();
  const dispatch = useDispatch()
  const [user, setUser] = useState({});

  console.log("==================", userId)

  useEffect(() => {
    dispatch(getUserReservationsThunk(userId))
  }, [dispatch])

  if (!user) {
    return null;
  }

  return (
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
  );
}
export default UserProfile
