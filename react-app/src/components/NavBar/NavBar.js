import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Link } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { getFarmsThunk } from '../../store/farm'

import './navbar.css'

const NavBar = () => {
  // const dispatch = useDispatch()
  const farms = useSelector(state => state.farms)
  const farmsArray = Object.values(farms)

  const [location, setLocation] = useState("")
  // const [type, setType] = useState("")

  const uniqueArray = []

  // useEffect(() => {
  //   dispatch(getFarmsThunk())
  // }, [dispatch])

  if (location.length){
    farmsArray.filter((val) => {
      return val.state.toLowerCase().includes(location.toLowerCase())
    }).map((val) => {
      if(!uniqueArray.includes(val.state)){
        uniqueArray.push(val.state)
      }
    })
  }

  function handleSubmit(e){
    setLocation("")
  }


  return (
    <nav>
      <ul className = "parent">
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              value={location}
              type="text"
              placeholder="Location..."
              onChange={(e) => setLocation(e.target.value)}
            />
              {uniqueArray.length ?
                uniqueArray.map((val, key) => {
                  console.log('UArray', uniqueArray)
                  return (
                    <div key={key}>
                      <NavLink to={{
                         pathname: "/searchResults",
                         state : {
                          val : val
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
        <li>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
