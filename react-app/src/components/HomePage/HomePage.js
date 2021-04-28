import React, { useEffect } from "react"
import { getFarmsThunk } from "../../store/farm"
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'

import "./HomePage.css"

function Home() {
  const dispatch = useDispatch()
  const farms = useSelector(state => state.farms)
  console.log('Farms', farms)

  useEffect(() => {
    dispatch(getFarmsThunk())
  }, [dispatch, farms])

  //maybe talk about validators if farms is not in database(but it really is)


  //filter by type of farms (Winery and Dairy)

    const wineryElement = Object.values(farms).filter(farm => farm.type === "Winery").map(farm => {
      console.log('Wine', farm)
      return (
          <Link to={`/farm/${farm.id}`} key={farm.id} className="farmLink">
            <p>{farm.name}</p>
            <p>{farm.type}</p>
          </Link>
      )
    })

    const dairyElement = Object.values(farms).filter(farm => farm.type === "Dairy Farm").map(farm => {
      return (
          <Link to={`/farm/${farm.id}`} key={farm.id} className="farmLink">
            <p>{farm.name}</p>
            <p>{farm.type}</p>
          </Link>
      )
    })

  return (
    <>

      <h1>This is rendering Homepage</h1>
      {farms &&
      <div>
        <div>{wineryElement}</div>
        <div>{dairyElement}</div>
      </div>
      }
    </>
  )
}

export default Home
