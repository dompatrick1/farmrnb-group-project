import React, { useEffect } from "react"
import { getFarmsThunk } from "../../store/farm"
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'

import "./HomePage.css"

function Home() {
  const dispatch = useDispatch()
  const farms = useSelector(state => state.farms)

  useEffect(() => {
    dispatch(getFarmsThunk())
  }, [dispatch])

  //maybe talk about validators if farms is not in database(but it really is)


  //filter by type of farms (Winery and Dairy)

    const wineryElement = Object.values(farms).filter(farm => farm.type === "Winery").map(farm => {
      return (
          <Link to={`/farm/${farm.id}`} key={farm.id} className="farmLink">
            <div className="homeFarmName">
              <p>{farm.name}</p>
            </div>
          </Link>
      )
    })

    const dairyElement = Object.values(farms).filter(farm => farm.type === "Dairy Farm").map(farm => {
      return (
          <Link to={`/farm/${farm.id}`} key={farm.id} className="farmLink">
            <div className="homeFarmName">
              <p>{farm.name}</p>
            </div>
          </Link>
      )
    })

    const agricultureElement = Object.values(farms).filter(farm => farm.type === "Agriculture").map(farm => {
      return (
          <Link to={`/farm/${farm.id}`} key={farm.id} className="farmLink">
            <div className="homeFarmName">
              <p>{farm.name}</p>
            </div>
          </Link>
      )
    })

    const hempElement = Object.values(farms).filter(farm => farm.type === "Hemp").map(farm => {
      return (
          <Link to={`/farm/${farm.id}`} key={farm.id} className="farmLink">
            <div className="homeFarmName">
              <p>{farm.name}</p>
            </div>
          </Link>
      )
    })

  return (
    <div>
      <div className="bannerParent">
        <div className="bannerTextScale">
          <h1>Welcome to FarmRnB</h1>
          <p>We offer a hands-on, educational farming experience. You work, you stay.</p>
        </div>
        <img src='./farmrnb_banner.jpeg' className="homeBanner"/>
      </div>
      {farms &&
      <div className="homeMainBox">
        <div className="homeBoxDiv">
          <h2 className="homeCategoryTitle">Wineries</h2>
          <div className="homeCategory">{wineryElement}</div>
        </div>
        <div className="homeBoxDiv">
          <h2 className="homeCategoryTitle">Dairy</h2>
          <div className="homeCategory">{dairyElement}</div>
        </div>
        <div className="homeBoxDiv">
          <h2 className="homeCategoryTitle">Fruits and Veggies</h2>
          <div className="homeCategory">{agricultureElement}</div>
        </div>
        <div className="homeBoxDiv">
          <h2 className="homeCategoryTitle">Cannabis</h2>
          <div className="homeCategory">{hempElement}</div>
        </div>
      </div>
      }
    </div>
  )
}

export default Home
