import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Link } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { getFarmsThunk } from '../../store/farm'

import './navbar.css'

const NavBar = () => {
  // const dispatch = useDispatch()
  const farms = useSelector(state => state.farms)
  const user = useSelector(state => state.session.user)
  const farmsArray = Object.values(farms)
  const [location, setLocation] = useState("")
  // const [type, setType] = useState("")

  const uniqueArray = []
  let userId;

  // useEffect(() => {
  //   dispatch(getFarmsThunk())
  // }, [dispatch])
  if (user) {
    userId = user.id
  }

  if (location.length) {
    farmsArray.filter((val) => {
      return val.state.toLowerCase().includes(location.toLowerCase())
    }).map((val) => {
      if (!uniqueArray.includes(val.state)) {
        uniqueArray.push(val.state)
      }
    })
  }

  function handleSubmit(e) {
    setLocation("")
  }
  // ********************************************************** */
  function isLoggedIn() {
    if (user) {
      return (
        <li>
          <LogoutButton />
        </li>
      )
    }
  }

  function hideLoginSignUp() {
    if (!user) {
      return (
        <div>
          <li>
            <NavLink to="/login" exact={true} activeClassName="active">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              Sign Up
            </NavLink>
          </li>
        </div>
      )
    }
  }

  function hideProfile() {
    if (user) {
      return (
        <li>
          <NavLink to={`/user/${userId}`} exact={true} activeClassName="active" className="navbar-link">
            Profile
          </NavLink>
        </li>
      )
    }
  }


  //****************************************************************** */
  return (
    <nav>
      <ul className="parent">
        <div>
          <NavLink to="/" exact={true} activeClassName="active" className="home-link">
            FarmRnB
          </NavLink>
        </div>
        {hideProfile()}
        <div className="searchBarContainer">
          <li>
            <form className="searchBar" onSubmit={(e) => handleSubmit(e)}>
              <input
                value={location}
                type="text"
                placeholder="Search by State..."
                onChange={(e) => setLocation(e.target.value)}
              />
              {uniqueArray.length ?
                uniqueArray.map((val, key) => {
                  console.log('UArray', uniqueArray)
                  return (
                    <div className="searchedList" key={key}>
                      <NavLink to={{
                        pathname: "/searchResults",
                        state: {
                          val: val
                        },
                      }} onClick={e => handleSubmit(e)}>
                        {val}
                      </NavLink>
                    </div>
                  )
                })
                : null}
            </form>
          </li>
        </div>
        {hideLoginSignUp()}
        <div className="isLoggedIn">
          {isLoggedIn()}
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;
